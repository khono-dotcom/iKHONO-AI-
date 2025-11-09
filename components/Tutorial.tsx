import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/XIcon';
import { translations } from '../lib/translations';

interface TutorialProps {
  onClose: () => void;
  lang: string;
  currentView: 'profile' | 'dashboard' | 'chat';
}

const Tutorial: React.FC<TutorialProps> = ({ onClose, lang, currentView }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (currentView === 'profile') setStep(1);
    else if (currentView === 'dashboard') setStep(2);
    else if (currentView === 'chat') setStep(3);
  }, [currentView]);

  const steps = [
    // Step 1: Profile Screen
    {
      title: translations['tutorial.step1.title'][lang] || 'Choose Your Path',
      content: translations['tutorial.step1.content'][lang] || 'First, select the profile that best fits you to get a personalized experience.',
      targetClass: 'profile-selector-targets',
    },
    // Step 2: Dashboard
    {
      title: translations['tutorial.step2.title'][lang] || 'Your Learning Dashboard',
      content: translations['tutorial.step2.content'][lang] || 'This is your home base. From here, you can access all the AI tutors tailored to your profile.',
      targetClass: 'dashboard-main-content',
    },
    // Step 3: Chat View (or just dashboard features)
    {
      title: translations['tutorial.step3.title'][lang] || 'Meet Your AI Tutors',
      content: translations['tutorial.step3.content'][lang] || 'Tap on any card to start a conversation with a specialized AI tutor. Each one is an expert in its field!',
      targetClass: 'dashboard-feature-cards',
    },
  ];

  const currentStepData = steps[step - 1];

  if (!currentStepData) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className={`relative bg-slate-800 border border-purple-500/50 p-6 rounded-2xl max-w-sm w-full shadow-2xl shadow-purple-500/10 transition-all duration-300 transform animate-fade-in-up`}>
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-white">
          <XIcon className="w-6 h-6" />
          <span className="sr-only">{translations['tutorial.skip'][lang] || 'Skip'}</span>
        </button>
        
        <div className="text-center">
            <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl border-2 border-purple-500">
                    {step}
                </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{currentStepData.title}</h3>
            <p className="text-slate-300">{currentStepData.content}</p>
        </div>

        {step === 3 && (
            <div className="mt-6 text-center">
                <button onClick={onClose} className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg">
                    {translations['tutorial.done'][lang] || "You're all set!"}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
