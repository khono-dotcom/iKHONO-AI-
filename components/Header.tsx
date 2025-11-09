import React from 'react';
import { GlobeIcon } from './icons/GlobeIcon';
import { SwitchUserIcon } from './icons/SwitchUserIcon';
import { translations } from '../lib/translations';

interface HeaderProps {
    lang: string;
    setLang: (lang: string) => void;
    onSwitchProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, onSwitchProfile }) => {

    return (
        <header className="bg-slate-900 p-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-100">iKHONO AI</h1>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={onSwitchProfile}
                        className="bg-slate-800 border border-slate-700 rounded-full p-2.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-slate-700"
                        title={translations['header.switch_profile'][lang] || 'Switch Profile'}
                        aria-label={translations['header.switch_profile'][lang] || 'Switch Profile'}
                    >
                        <SwitchUserIcon className="w-5 h-5" />
                    </button>
                    <div className="relative">
                        <GlobeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select 
                            value={lang} 
                            onChange={(e) => setLang(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                        >
                            <option value="en">English</option>
                            <option value="zu">isiZulu</option>
                            <option value="xh">isiXhosa</option>
                            <option value="af">Afrikaans</option>
                            <option value="nso">Sesotho sa Leboa</option>
                            <option value="st">Sesotho</option>
                            <option value="tn">Setswana</option>
                            <option value="ss">siSwati</option>
                            <option value="ve">Tshivenḓa</option>
                            <option value="ts">Xitsonga</option>
                            <option value="nr">isiNdebele</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;