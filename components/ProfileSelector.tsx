import React from 'react';
// Fix: UserProfile is exported from types.ts, not App.tsx.
import type { UserProfile } from '../types';
import { translations } from '../lib/translations';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { UserIcon } from './icons/UserIcon';

interface ProfileSelectorProps {
  onSelectProfile: (profile: UserProfile) => void;
  lang: string;
}

interface ProfileCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  onClick: () => void;
  color: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ icon: Icon, title, description, onClick, color }) => (
  <button 
    onClick={onClick}
    className="w-full bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-center flex flex-col items-center hover:border-purple-500 hover:bg-slate-800 transition-all duration-300"
  >
    <div className="p-4 rounded-full mb-4" style={{ backgroundColor: `${color}20` }}>
      <Icon className="w-10 h-10" style={{ color }} />
    </div>
    <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </button>
);

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelectProfile, lang }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <h1 className="text-3xl font-bold text-gray-100 mb-2">
        {translations['profile.title'][lang] || 'Welcome to iKHONO AI'}
      </h1>
      <p className="text-lg text-gray-400 mb-12">
        {translations['profile.subtitle'][lang] || 'Who is learning today?'}
      </p>

      <div className="w-full max-w-sm space-y-6">
        <ProfileCard
          icon={GraduationCapIcon}
          title={translations['profile.learner.title'][lang] || 'School & University Learner'}
          description={translations['profile.learner.description'][lang] || 'For primary, high school, and tertiary students.'}
          onClick={() => onSelectProfile('learner')}
          color="#8B5CF6" // Violet
        />
        <ProfileCard
          icon={UserIcon}
          title={translations['profile.adult.title'][lang] || 'Adult Learner'}
          description={translations['profile.adult.description'][lang] || 'For skills development and lifelong learning.'}
          onClick={() => onSelectProfile('adult')}
          color="#3B82F6" // Blue
        />
      </div>
    </div>
  );
};

export default ProfileSelector;