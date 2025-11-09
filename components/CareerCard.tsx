import React from 'react';
import type { Career, Tutor } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { translations } from '../lib/translations';
import { TUTOR_DATA } from '../constants';

interface CareerCardProps {
  career: Career;
  onSelectTutor: (tutorId: string) => void;
  lang: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, onSelectTutor, lang }) => {
  
  const getTutorById = (tutorId: string): Tutor | undefined => {
    return TUTOR_DATA.find(t => t.id === tutorId);
  }

  const getTranslatedTutorName = (tutorId: string, lang: string): string => {
      const tutor = getTutorById(tutorId);
      if (!tutor) return tutorId;
      const tName = translations[`tutor.${tutor.id}.name`];
      return (tName && tName[lang]) || tutor.name;
  };

  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 my-4">
      <div className="relative">
        <img src={career.imageURL} alt={career.careerName} className="w-full h-40 object-cover" />
        <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        ></div>
        <button 
            onClick={() => window.open(career.videoURL, '_blank')}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            aria-label={`Play video about ${career.careerName}`}
        >
            <PlayIcon className="w-8 h-8" />
        </button>
        <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">{career.careerName}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-400 text-sm mb-4">{career.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div className="bg-slate-900/70 p-3 rounded-lg">
                <p className="font-semibold text-gray-100">{career.salaryRange}</p>
                <p className="text-gray-400">Salary p/m</p>
            </div>
            <div className="bg-slate-900/70 p-3 rounded-lg">
                <p className="font-semibold text-gray-100">{career.educationLevel}</p>
                <p className="text-gray-400">{translations['career.required_education'][lang] || 'Required Education'}</p>
            </div>
        </div>

        <div>
            <h4 className="font-semibold text-gray-100 mb-2">{translations['career.suggested_path'][lang] || 'Suggested Learning Path'}</h4>
            <div className="space-y-2">
                {career.learningPath.map(path => {
                    const tutor = getTutorById(path.tutorId);
                    if (!tutor) return null;
                    const Icon = tutor.icon;
                    return (
                        <button key={path.tutorId} onClick={() => onSelectTutor(path.tutorId)} className="w-full text-left flex items-center space-x-3 p-3 bg-slate-900/70 hover:bg-slate-700/70 rounded-lg transition-colors">
                           <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${tutor.color}20` }}>
                                <Icon className="w-5 h-5" style={{ color: tutor.color }} />
                           </div>
                           <div>
                                <p className="font-semibold text-sm text-gray-200">{getTranslatedTutorName(tutor.id, lang)}</p>
                                <p className="text-xs text-gray-400">{path.reason}</p>
                           </div>
                        </button>
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;