import React from 'react';
import type { StudySubject } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { translations } from '../lib/translations';
import { LightbulbIcon } from './icons/LightbulbIcon';

interface StudyMethodCardProps {
  studySubject: StudySubject;
  lang: string;
}

const StudyMethodCard: React.FC<StudyMethodCardProps> = ({ studySubject, lang }) => {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 my-4">
      <div className="relative">
         <video 
            key={studySubject.videoURL}
            className="w-full h-40 object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
        >
            <source src={studySubject.videoURL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <a 
            href={studySubject.videoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            aria-label={`Play video about studying ${studySubject.subjectName}`}
        >
            <PlayIcon className="w-8 h-8" />
        </a>
        <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">{studySubject.subjectName}</h3>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-100 mb-3 text-md">{translations['study.key_techniques'][lang] || 'Key Study Techniques'}</h4>
        <div className="space-y-3">
            {studySubject.studyMethods.map((method, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-900/70 rounded-lg">
                   <div className="flex-shrink-0 bg-amber-500/20 p-2 rounded-lg mt-1">
                        <LightbulbIcon className="w-5 h-5 text-amber-500" />
                   </div>
                   <div>
                        <p className="font-semibold text-sm text-gray-200">{method.technique}</p>
                        <p className="text-xs text-gray-400">{method.description}</p>
                   </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMethodCard;
