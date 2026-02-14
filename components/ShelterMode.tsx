
import React from 'react';
import { Moon } from 'lucide-react';

export const ShelterMode: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-1000">
      <div className="max-w-md w-full space-y-12">
        <div className="space-y-6">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-breathe blur-xl"></div>
             <div className="relative z-10 w-16 h-16 border-2 border-zinc-800 rounded-full flex items-center justify-center bg-zinc-900">
                <span className="text-3xl">🐿️</span>
             </div>
          </div>
          
          <h1 className="text-2xl font-bold text-zinc-200 tracking-wide">
            Dr. Squirrel 提醒：
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed">
            “现在是睡觉时间。<br/>
            把松果放下，把尾巴盖好。<br/>
            天亮再说。”
          </p>
        </div>

        <div className="fixed bottom-12 left-0 right-0 flex justify-center">
            <div className="text-zinc-800 text-xs mono tracking-[0.5em] uppercase">
                SYSTEM SLEEPING
            </div>
        </div>
      </div>
    </div>
  );
};
