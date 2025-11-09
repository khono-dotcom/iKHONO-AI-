
import React from 'react';
// Fix: Merged Tutor and UserProfile type imports from ../types.
import type { Tutor, UserProfile } from '../types';
import { TUTOR_DATA } from '../constants';
import Header from './Header';
import { translations } from '../lib/translations';

interface DashboardProps {
  onSelectTutor: (tutor: Tutor) => void;
  lang: string;
  setLang: (lang: string) => void;
  userProfile: UserProfile;
  onSwitchProfile: () => void;
}

const FeatureCard: React.FC<{ tutor: Tutor; onClick: () => void }> = ({ tutor, onClick }) => {
  const Icon = tutor.icon;
  return (
    <button
      onClick={onClick}
      className={`bg-slate-800/50 p-4 rounded-2xl transition-all duration-300 text-left flex items-start space-x-4 border border-slate-700 hover:border-purple-500 hover:bg-slate-800 w-full`}
    >
      <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${tutor.color}20` }}>
        <Icon className="w-6 h-6" style={{ color: tutor.color }} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-100 text-md">{tutor.name}</h3>
        <p className="text-gray-400 text-sm">{tutor.description}</p>
      </div>
    </button>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ onSelectTutor, lang, setLang, userProfile, onSwitchProfile }) => {
  
  const getTranslatedTutor = (tutor: Tutor, currentLang: string): Tutor => {
    const tName = translations[`tutor.${tutor.id}.name`];
    const tDesc = translations[`tutor.${tutor.id}.description`];

    return {
        ...tutor,
        name: (tName && tName[currentLang]) || tutor.name,
        description: (tDesc && tDesc[currentLang]) || tutor.description,
    };
  }
  
  const dailyLessonTutor = TUTOR_DATA.find(t => t.id === 'daily_lesson');
  const translatedDailyLessonTutor = dailyLessonTutor ? getTranslatedTutor(dailyLessonTutor, lang) : null;
  
  const availableTutors = TUTOR_DATA.filter(tutor => tutor.profiles.includes(userProfile));
  
  const greetingKey = userProfile === 'adult' ? 'dashboard.greeting.adult' : 'dashboard.greeting';
  const greeting = translations[greetingKey][lang] || translations[greetingKey]['en'];

  return (
    <div className="flex flex-col h-full">
      <Header lang={lang} setLang={setLang} onSwitchProfile={onSwitchProfile} />
      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-100">{greeting}</h2>
        
        {userProfile === 'learner' && translatedDailyLessonTutor && (
             <div
                onClick={() => onSelectTutor(dailyLessonTutor!)}
                className="cursor-pointer bg-gradient-to-br from-purple-600 to-indigo-700 p-5 rounded-2xl text-white shadow-lg hover:scale-[1.02] transition-transform duration-300 flex items-center space-x-4"
              >
                <div className="bg-black/20 p-3 rounded-xl">
                    <translatedDailyLessonTutor.icon className="w-8 h-8 text-white"/>
                </div>
                <div>
                    <h3 className="font-bold text-lg">{translatedDailyLessonTutor.name}</h3>
                    <p className="text-sm">{translatedDailyLessonTutor.description}</p>
                </div>
            </div>
        )}
        
        <div className="space-y-3 pt-2">
            {availableTutors.filter(t=>t.id !== 'daily_lesson').map((tutor) => {
                const translatedTutor = getTranslatedTutor(tutor, lang);
                return <FeatureCard key={tutor.id} tutor={translatedTutor} onClick={() => onSelectTutor(tutor)} />
            })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
