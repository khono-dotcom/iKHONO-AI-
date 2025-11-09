import React from 'react';
import type { Sign } from '../types';

interface SignLanguageDisplayProps {
  signs: Sign[];
}

const SignLanguageDisplay: React.FC<SignLanguageDisplayProps> = ({ signs }) => {
  return (
    <div className="w-full">
      <div className="flex overflow-x-auto space-x-2 p-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        {signs.map((sign, index) => (
          <div key={index} className="flex-shrink-0 text-center w-28">
            <div className="bg-slate-700 rounded-lg h-28 w-28 flex items-center justify-center mb-1">
              <img 
                src={sign.signImageUrl} 
                alt={`Sign for ${sign.word}`} 
                className="max-h-full max-w-full object-contain" 
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-300 truncate">{sign.word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignLanguageDisplay;
