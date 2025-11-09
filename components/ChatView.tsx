import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import type { Tutor, Message } from '../types';
import { translations } from '../lib/translations';
import * as geminiService from '../services/geminiService';
import CareerCard from './CareerCard';
import StudyMethodCard from './StudyMethodCard';
import DigitalSkillCard from './DigitalSkillCard';
import SignLanguageDisplay from './SignLanguageDisplay';
import { UserIcon } from './icons/UserIcon';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { HandIcon } from './icons/HandIcon';
import { MicIcon } from './icons/MicIcon';
import { decode, decodeAudioData, encode } from '../lib/audioUtils';

// Fix: The global declaration for window.aistudio was moved to types.ts to fix redeclaration errors.

const ChatView: React.FC<{ tutor: Tutor; onBack: () => void; lang: string; onSelectTutor: (tutorId: string) => void; }> = ({ tutor, onBack, lang, onSelectTutor }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    geminiService.resetChat(tutor.id);
    const newChat = geminiService.getOrCreateChat(tutor);
    setChat(newChat);
    setMessages([]);
    if (tutor.outputType === 'video_generation') {
        checkApiKey();
    }
  }, [tutor]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkApiKey = async () => {
    if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };
  
  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '', isThinking: true }]);
    
    try {
      let finalMessage: Partial<Message> = { text: '', isThinking: false };

      if (tutor.outputType === 'career_card') {
        finalMessage.careers = await geminiService.getCareerSuggestions(textToSend);
      } else if (tutor.outputType === 'study_method_card') {
        finalMessage.studySubjects = await geminiService.getStudyMethods(textToSend);
      } else if (tutor.outputType === 'digital_skill_card') {
        finalMessage.digitalSkills = await geminiService.getDigitalSkillGuide(textToSend);
      } else if (tutor.outputType === 'sign_language_translation') {
        finalMessage.signLanguageContent = await geminiService.getSignLanguageTranslation(textToSend);
      } else if (tutor.outputType === 'video_generation') {
        setMessages(prev => prev.map(msg => msg.id === modelMessageId ? { ...msg, isThinking: false, videoGenerationStatus: 'generating' } : msg));
        const operation = await geminiService.generateVideo(textToSend, '16:9');
        let result = await geminiService.getGeneratedVideo(operation);
        while (!result.done) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            result = await geminiService.getGeneratedVideo(result);
        }
        const videoUri = result.response?.generatedVideos?.[0]?.video?.uri;
        if(videoUri) {
             finalMessage.videoUrl = `${videoUri}&key=${process.env.API_KEY}`;
             finalMessage.videoGenerationStatus = 'done';
        } else {
            finalMessage.videoGenerationStatus = 'failed';
            finalMessage.text = "Video generation failed. Please try again.";
        }
      } else {
        if (!chat) throw new Error("Chat not initialized");
        const stream = await geminiService.streamChat(chat, textToSend);
        for await (const chunk of stream) {
            finalMessage.text += chunk;
            setMessages(prev => prev.map(msg => msg.id === modelMessageId ? { ...msg, text: finalMessage.text!, isThinking: false } : msg));
        }
      }
      setMessages(prev => prev.map(msg => msg.id === modelMessageId ? { ...msg, ...finalMessage } : msg));
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = "Sorry, something went wrong.";
      if (error instanceof Error && error.message.includes('Requested entity was not found')) {
        errorMessage = "API Key error. Please re-select your key.";
        if (tutor.outputType === 'video_generation') setHasApiKey(false);
      }
      setMessages(prev => prev.map(msg => msg.id === modelMessageId ? { ...msg, text: errorMessage, isThinking: false } : msg));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioPlayback = async (text: string) => {
    const audioBase64 = await geminiService.textToSpeech(text);
    if(audioBase64) {
      const audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(decode(audioBase64), audioContext, 24000, 1);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  }

  const handleSignLanguageRequest = async (messageId: string, text: string) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, isThinking: true } : msg));
    const signs = await geminiService.getSignLanguageTranslation(text);
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, isThinking: false, signLanguageContent: signs } : msg));
  }

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => audioChunksRef.current.push(event.data);
      mediaRecorderRef.current.onstop = async () => {
        setIsLoading(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          const transcription = await geminiService.transcribeAudio(base64Audio);
          if (transcription) handleSend(transcription);
          audioChunksRef.current = [];
          setIsLoading(false);
        };
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const TutorIcon = tutor.icon;

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <header className="flex items-center p-4 border-b border-slate-700 sticky top-0 bg-slate-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="mr-4 p-2 -ml-2 rounded-full text-gray-300 hover:text-white hover:bg-slate-800">&larr;</button>
        <div className="flex items-center space-x-3"><div className={`p-2 rounded-lg`} style={{ backgroundColor: `${tutor.color}20` }}><TutorIcon className="w-6 h-6" style={{ color: tutor.color }}/></div><h2 className="text-lg font-semibold text-gray-100">{tutor.name}</h2></div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && tutor.longDescription && (
            <div className="text-center text-gray-400 pt-10 flex flex-col items-center"><div className="flex justify-center mb-4"><div className={`p-4 rounded-full`} style={{ backgroundColor: `${tutor.color}20` }}><TutorIcon className="w-12 h-12" style={{ color: tutor.color }}/></div></div><h3 className="text-xl font-semibold text-gray-200">{tutor.name}</h3><p className="text-sm max-w-sm">{tutor.longDescription}</p></div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-3 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (<div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${tutor.color}20` }}><TutorIcon className="w-5 h-5" style={{ color: tutor.color }} /></div>)}
            <div className={`max-w-md rounded-2xl p-3 ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-slate-800 text-gray-200 rounded-bl-none'}`}>
              {msg.isThinking ? (<div className="flex items-center space-x-2"><div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div></div>) : (
                <>
                  {msg.text && <p className="text-sm whitespace-pre-wrap">{msg.text}</p>}
                  {msg.careers?.map((c,i) => <CareerCard key={i} career={c} onSelectTutor={onSelectTutor} lang={lang} />)}
                  {msg.studySubjects?.map((s,i) => <StudyMethodCard key={i} studySubject={s} lang={lang} />)}
                  {msg.digitalSkills?.map((s,i) => <DigitalSkillCard key={i} skill={s} lang={lang} />)}
                  {msg.videoGenerationStatus === 'generating' && <p className="text-sm text-purple-400">{translations['video.generating_message'][lang]}</p>}
                  {msg.videoUrl && <video src={msg.videoUrl} controls className="rounded-lg w-full mt-2" />}
                  {msg.signLanguageContent && <SignLanguageDisplay signs={msg.signLanguageContent} />}
                  {msg.role === 'model' && msg.text && !msg.signLanguageContent && (
                    <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-slate-700/50">
                        <button onClick={() => handleAudioPlayback(msg.text)} className="text-slate-400 hover:text-white" title="Read aloud"><SpeakerIcon className="w-4 h-4" /></button>
                        <button onClick={() => handleSignLanguageRequest(msg.id, msg.text)} className="text-slate-400 hover:text-white" title="Translate to Sign Language"><HandIcon className="w-4 h-4" /></button>
                    </div>
                  )}
                </>
              )}
            </div>
            {msg.role === 'user' && (<div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-700"><UserIcon className="w-5 h-5 text-gray-300" /></div>)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <footer className="p-4 border-t border-slate-700 sticky bottom-0 bg-slate-900">
        {tutor.outputType === 'video_generation' ? (
            !hasApiKey ? (
                <div className="text-center bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-bold text-white">{translations['video.select_key_title'][lang]}</h4>
                    <p className="text-sm text-slate-300 mt-1 mb-3">{translations['video.select_key_description'][lang]}</p>
                    <button onClick={handleSelectKey} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg">{translations['video.select_key_button'][lang]}</button>
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="block text-xs text-slate-400 mt-2 hover:underline">{translations['video.billing_link'][lang]}</a>
                </div>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2">
                  <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={translations['video.prompt_placeholder'][lang]} className="w-full bg-slate-800 border border-slate-700 rounded-full py-2.5 px-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  <button type="submit" disabled={isLoading} className="bg-purple-600 text-white rounded-lg px-4 py-2.5 text-sm font-semibold disabled:bg-slate-700">{translations['video.generate_button'][lang]}</button>
                </form>
            )
        ) : tutor.outputType === 'audio_transcription' ? (
            <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center space-x-4">
                    <button onClick={toggleRecording} className={`flex items-center space-x-2 font-semibold text-sm px-4 py-2 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-200'}`}>{isRecording ? translations['audio.stop_recording'][lang] : translations['audio.start_recording'][lang]} <MicIcon className="w-4 h-4" /></button>
                </div>
                <div className="text-center text-xs text-slate-500">OR</div>
                <form onSubmit={(e) => { e.preventDefault(); handleAudioPlayback(input); setInput('');}} className="flex items-center space-x-2">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={translations['audio.type_to_speak_placeholder'][lang]} className="w-full bg-slate-800 border border-slate-700 rounded-full py-2.5 px-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <button type="submit" disabled={!input.trim()} className="bg-purple-600 text-white rounded-lg px-4 py-2.5 text-sm font-semibold disabled:bg-slate-700">{translations['audio.speak_button'][lang]}</button>
                </form>
            </div>
        ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={translations['chat.input_placeholder'][lang]} className="w-full bg-slate-800 border border-slate-700 rounded-full py-2.5 px-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" disabled={isLoading} />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-purple-600 text-white rounded-full p-3 disabled:bg-slate-700 hover:bg-purple-700"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg></button>
            </form>
        )}
      </footer>
    </div>
  );
};
export default ChatView;