import React, { useState, useCallback, useEffect } from 'react';
import type { Tutor, UserProfile } from './types';
import Dashboard from './components/Dashboard';
import ChatView from './components/ChatView';
import ProfileSelector from './components/ProfileSelector';
import { TUTOR_DATA } from './constants';
import Tutorial from './components/Tutorial';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentTutor, setCurrentTutor] = useState<Tutor | null>(null);
  const [lang, setLang] = useState<string>('en');
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentView, setCurrentView] = useState<'profile' | 'dashboard' | 'chat'>('profile');

  useEffect(() => {
    if (!userProfile) setCurrentView('profile');
    else if (!currentTutor) setCurrentView('dashboard');
    else setCurrentView('chat');
  }, [userProfile, currentTutor]);

  const handleSelectProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    const isFirstTime = !localStorage.getItem(`visited_ikhono_tutorial`);
    if (isFirstTime) {
      setShowTutorial(true);
      localStorage.setItem(`visited_ikhono_tutorial`, 'true');
    }
  };
  
  const handleSwitchProfile = () => {
    setUserProfile(null);
    setCurrentTutor(null);
  }

  const handleSelectTutor = useCallback((tutor: Tutor | string) => {
    if (typeof tutor === 'string') {
        const foundTutor = TUTOR_DATA.find(t => t.id === tutor);
        setCurrentTutor(foundTutor || null);
    } else {
        setCurrentTutor(tutor);
    }
  }, []);

  const handleBack = () => {
    setCurrentTutor(null);
  };
  
  const closeTutorial = () => {
      setShowTutorial(false);
  }

  return (
    <div className="bg-slate-900 text-white h-screen font-sans">
      <div className="h-full max-w-2xl mx-auto flex flex-col">
        {showTutorial && <Tutorial onClose={closeTutorial} lang={lang} currentView={currentView} />}

        {!userProfile ? (
          <ProfileSelector onSelectProfile={handleSelectProfile} lang={lang} />
        ) : !currentTutor ? (
          <Dashboard 
            onSelectTutor={handleSelectTutor} 
            lang={lang} 
            setLang={setLang}
            userProfile={userProfile}
            onSwitchProfile={handleSwitchProfile}
          />
        ) : (
          <ChatView 
            tutor={currentTutor} 
            onBack={handleBack} 
            lang={lang}
            onSelectTutor={(tutorId) => handleSelectTutor(tutorId)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
