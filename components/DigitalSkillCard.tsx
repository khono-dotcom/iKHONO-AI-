import React from 'react';
import type { DigitalSkill } from '../types';
import { PlayIcon } from './icons/PlayIcon';

interface DigitalSkillCardProps {
  skill: DigitalSkill;
  lang: string;
}

const DigitalSkillCard: React.FC<DigitalSkillCardProps> = ({ skill }) => {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 my-4">
      <div className="relative">
        <img src={skill.imageURL} alt={skill.skillName} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <a 
            href={skill.videoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            aria-label={`Play video about ${skill.skillName}`}
        >
            <PlayIcon className="w-8 h-8" />
        </a>
        <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">{skill.skillName}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-400 text-sm mb-4">{skill.introduction}</p>
        <div className="space-y-3">
            {skill.steps.sort((a,b) => a.stepNumber - b.stepNumber).map((step) => (
                <div key={step.stepNumber} className="flex items-start space-x-3">
                   <div className="flex-shrink-0 bg-cyan-500/20 text-cyan-400 font-bold w-8 h-8 flex items-center justify-center rounded-full mt-1 border-2 border-cyan-500/50">
                        {step.stepNumber}
                   </div>
                   <div>
                        <p className="font-semibold text-sm text-gray-200">{step.title}</p>
                        <p className="text-xs text-gray-400">{step.description}</p>
                   </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalSkillCard;