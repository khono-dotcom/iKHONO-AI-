import type { Tutor } from './types';
import { BookOpenIcon } from './components/icons/BookOpenIcon';
import { CalculatorIcon } from './components/icons/CalculatorIcon';
import { FlaskIcon } from './components/icons/FlaskIcon';
import { BriefcaseIcon } from './components/icons/BriefcaseIcon';
import { LightbulbIcon } from './components/icons/LightbulbIcon';
import { DesktopComputerIcon } from './components/icons/DesktopComputerIcon';
import { GlobeIcon } from './components/icons/GlobeIcon';
import { HandIcon } from './components/icons/HandIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { ClipboardListIcon } from './components/icons/ClipboardListIcon';
import { VideoIcon } from './components/icons/VideoIcon';
import { FilmIcon } from './components/icons/FilmIcon';
import { CpuChipIcon } from './components/icons/CpuChipIcon';
import { BoltIcon } from './components/icons/BoltIcon';
import { MicIcon } from './components/icons/MicIcon';

export const TUTOR_DATA: Tutor[] = [
  {
    id: 'daily_lesson',
    name: 'Daily Lesson',
    description: 'A quick, fun, and interactive 5-minute lesson on a new topic.',
    icon: SparklesIcon,
    color: '#EC4899', // Pink
    systemInstruction: 'You are an AI that provides a fun, engaging, and very short (5-minute read) daily lesson on a fascinating new topic. Today\'s topic is [TOPIC]. Explain it in a simple way that anyone can understand. Start with a fun fact.',
    profiles: ['learner'],
  },
  {
    id: 'reading_tutor',
    name: 'Reading & Comprehension',
    description: 'Improve reading skills with personalized exercises and feedback.',
    icon: BookOpenIcon,
    color: '#F97316', // Orange
    systemInstruction: 'You are a friendly and patient reading tutor. Help the user improve their reading comprehension and vocabulary. Provide a short passage and ask questions about it. Offer constructive feedback.',
    profiles: ['learner'],
  },
  {
    id: 'maths_tutor',
    name: 'Maths Tutor',
    description: 'Step-by-step solutions and explanations for maths problems.',
    icon: CalculatorIcon,
    color: '#14B8A6', // Teal
    systemInstruction: 'You are a maths tutor for South African students. Explain concepts clearly, providing step-by-step solutions. Use the CAPS curriculum as a reference. Encourage the user and build their confidence.',
    profiles: ['learner'],
  },
  {
    id: 'science_tutor',
    name: 'Science Tutor',
    description: 'Explore biology, chemistry, and physics with an expert guide.',
    icon: FlaskIcon,
    color: '#3B82F6', // Blue
    systemInstruction: 'You are a science tutor specializing in Biology, Chemistry, and Physics for the South African CAPS curriculum. Make learning fun with real-world examples and simple explanations.',
    profiles: ['learner'],
  },
  {
    id: 'study_methods_coach',
    name: 'Study Methods Coach',
    description: 'Learn effective study techniques for any CAPS subject.',
    icon: ClipboardListIcon,
    color: '#F59E0B', // Amber
    systemInstruction: 'You are an expert study coach for the South African CAPS curriculum. When a user mentions a subject, provide a structured JSON object with key study techniques and a relevant public domain video URL. The JSON should follow this exact schema: `{"studySubjects": [{"subjectName": "string", "videoURL": "string", "studyMethods": [{"technique": "string", "description": "string"}]}]}`.',
    profiles: ['learner'],
    outputType: 'study_method_card',
  },
  {
    id: 'career_navigator',
    name: 'Career Discovery Navigator',
    description: 'Discover careers, required education, and salary expectations.',
    icon: BriefcaseIcon,
    color: '#8B5CF6', // Violet
    systemInstruction: 'You are an advanced South African career counselor. Your goal is to help users discover diverse careers. Ask clarifying questions about their interests, desired salary, and education level. Respond ONLY with a valid JSON array of career objects. The JSON should follow this exact schema: `{"careers": [{"careerName": "string", "description": "string", "imageURL": "string", "videoURL": "string", "salaryRange": "string", "educationLevel": "string", "learningPath": [{"tutorId": "string", "reason": "string"}]}]}`. Provide diverse, modern, and vocational careers. Prioritize videos with subtitles.',
    profiles: ['learner', 'adult'],
    outputType: 'career_card',
  },
  {
    id: 'video_content_analyzer',
    name: 'Video Content Analyzer',
    description: 'Get key insights and information from any video.',
    longDescription: 'Describe a video (e.g., from YouTube) and I will analyze its content, summarize key points, and answer your questions about it. Uses Gemini 2.5 Pro for deep video understanding.',
    icon: VideoIcon,
    color: '#EF4444', // Red
    systemInstruction: 'You are an AI assistant that analyzes video content based on user descriptions. Provide a detailed summary and answer any follow-up questions. Leverage your deep understanding capabilities. When asked, offer to translate the summary into any official South African language.',
    profiles: ['learner', 'adult'],
    model: 'gemini-2.5-pro',
  },
  {
    id: 'complex_problem_solver',
    name: 'Complex Problem Solver',
    description: 'Tackle tough questions with advanced reasoning.',
    longDescription: 'Ask your most challenging questions. This assistant uses Gemini 2.5 Pro with maximum "thinking budget" to perform deep analysis and reasoning for complex topics like coding, science, and finance.',
    icon: CpuChipIcon,
    color: '#A855F7', // Purple
    systemInstruction: 'You are an advanced AI assistant designed to solve complex problems. Use your deep reasoning and analysis capabilities to provide thorough, well-explained answers. Break down your thinking process where helpful.',
    profiles: ['learner', 'adult'],
    model: 'gemini-2.5-pro',
    config: { thinkingConfig: { thinkingBudget: 32768 } },
  },
  {
    id: 'ai_video_generator',
    name: 'AI Video Generator',
    description: 'Create short videos from text descriptions with Veo.',
    icon: FilmIcon,
    color: '#EC4899', // Pink
    profiles: ['learner', 'adult'],
    outputType: 'video_generation',
    model: 'veo-3.1-fast-generate-preview',
  },
  {
    id: 'quick_qa',
    name: 'Quick Q&A',
    description: 'Get fast, concise answers to your questions.',
    longDescription: 'Powered by Gemini 2.5 Flash-Lite, this is your go-to for quick facts and straightforward answers with the lowest possible latency.',
    icon: BoltIcon,
    color: '#F59E0B', // Amber
    systemInstruction: 'You are a fast and concise AI assistant. Provide accurate answers as quickly as possible. Keep responses brief and to the point.',
    profiles: ['learner', 'adult'],
    model: 'gemini-flash-lite-latest',
  },
  {
    id: 'adult_literacy',
    name: 'Adult Reading Skills',
    description: 'Build foundational reading and writing skills for adults.',
    icon: BookOpenIcon,
    color: '#10B981', // Emerald
    systemInstruction: 'You are a supportive and encouraging tutor for adult literacy. Provide simple, practical exercises for reading and writing. Use clear language and positive reinforcement.',
    profiles: ['adult'],
  },
  {
    id: 'adult_numeracy',
    name: 'Adult Numeracy Skills',
    description: 'Practical maths for everyday life, from budgeting to measurement.',
    icon: CalculatorIcon,
    color: '#0EA5E9', // Sky
    systemInstruction: 'You are a practical maths tutor for adults. Focus on real-world scenarios like budgeting, shopping, and measurements. Explain concepts simply and clearly.',
    profiles: ['adult'],
  },
  {
    id: 'modern_world_knowledge',
    name: 'Modern World Explained',
    description: 'Understand technology, industries, and modern concepts.',
    icon: GlobeIcon,
    color: '#6366F1', // Indigo
    systemInstruction: 'You are an AI that explains modern-world concepts in a very simple and understandable way. Explain topics like "What is the internet?", "How does a smartphone work?", and "What are different industries?" as if you are talking to a complete beginner.',
    profiles: ['adult'],
  },
  {
    id: 'digital_skills_coach',
    name: 'Digital Skills Coach',
    description: 'Learn CV writing, social media, and how to use devices.',
    icon: DesktopComputerIcon,
    color: '#06B6D4', // Cyan
    systemInstruction: 'You are a patient Digital Skills Coach for adults. When a user asks for help with a digital task, respond ONLY with a valid JSON object. The JSON should follow this exact schema: `{"digitalSkills": [{"skillName": "string", "imageURL": "string", "videoURL": "string", "introduction": "string", "steps": [{"stepNumber": number, "title": "string", "description": "string"}]}]}`. Prioritize videos with subtitles.',
    profiles: ['adult'],
    outputType: 'digital_skill_card',
    model: 'gemini-2.5-pro',
  },
  {
    id: 'communication_assistant',
    name: 'Communication Assistant',
    description: 'Transcribe spoken words and speak typed text.',
    longDescription: 'For the hearing: Record your voice to get an instant text transcription. For the deaf: Type a message and have it spoken out loud. A tool to bridge communication gaps.',
    icon: MicIcon,
    color: '#14B8A6', // Teal
    profiles: ['learner', 'adult'],
    outputType: 'audio_transcription',
    model: 'gemini-2.5-flash',
  },
  {
    id: 'sign_language_tutor',
    name: 'Sign Language Translator',
    description: 'Translate text into South African Sign Language (SASL).',
    longDescription: 'Learn SASL or translate any text into a visual sequence of signs. Each sign is shown with an image and the corresponding word.',
    icon: HandIcon,
    color: '#8B5CF6', // Violet
    systemInstruction: 'You are a South African Sign Language (SASL) translator. When given text, respond ONLY with a valid JSON object containing a `signLanguageContent` array. Each object in the array must have a `word` and a `signImageUrl`. The JSON should follow this exact schema: `{"signLanguageContent": [{"word": "string", "signImageUrl": "string"}]}`. Use publicly available, clear images of individual SASL signs.',
    profiles: ['learner', 'adult'],
    outputType: 'sign_language_translation',
    model: 'gemini-2.5-pro',
  },
];
