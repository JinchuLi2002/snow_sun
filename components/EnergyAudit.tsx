
import React from 'react';
import { Zap, Nut } from 'lucide-react';
import { EnergyLevel } from '../types';
import { HEALING_SCRIPTS } from '../constants';

interface EnergyAuditProps {
  level: EnergyLevel | null;
  onLevelSelect: (level: EnergyLevel) => void;
}

export const EnergyAudit: React.FC<EnergyAuditProps> = ({ level, onLevelSelect }) => {
  
  const getEnergyColor = (val: number) => {
    if (val <= 10) return 'text-red-500';
    if (val <= 30) return 'text-orange-500';
    if (val <= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getBatteryFill = (val: number) => {
    if (val <= 10) return 'bg-red-600 w-[10%] animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.8)]';
    if (val <= 30) return 'bg-orange-600 w-[30%]';
    if (val <= 60) return 'bg-yellow-500 w-[60%]';
    return 'bg-gradient-to-r from-yellow-500 to-green-500 w-[90%]';
  };

  // Squirrel States
  const OPTIONS = [
    { val: 10, label: '崩溃', sub: 'Injured', emoji: '🤕' },
    { val: 30, label: '生存', sub: 'Hibernating', emoji: '🛌' },
    { val: 60, label: '维护', sub: 'Foraging', emoji: '🌰' },
    { val: 90, label: '冲刺', sub: 'Flying', emoji: '🐿️' },
  ];

  return (
    <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 lg:p-8 backdrop-blur-md relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Nut size={120} />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Zap size={14} /> 战术部 (Tactical Dept.)
        </h2>
        {level && (
            <div className={`text-xs font-mono px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 ${getEnergyColor(level)}`}>
                松果储量: {level}%
            </div>
        )}
      </div>

      {/* Visual Battery / Acorn Gauge */}
      <div className="mb-8 relative z-10">
         <div className="h-10 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-20">
                {[...Array(9)].map((_, i) => <div key={i} className="border-r border-zinc-700 h-full" />)}
            </div>
            {/* The Acorn Fill */}
            <div 
              className={`h-full transition-all duration-1000 ease-out rounded-full relative ${level ? getBatteryFill(level) : 'w-0'}`} 
            >
                {/* Shine effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-full"></div>
            </div>
         </div>
         
         {/* Dr. Squirrel Message */}
         {level && (
             <div className="mt-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 bg-zinc-950/50 p-4 rounded-2xl border border-white/5">
                <div className="text-3xl shrink-0 pt-1">🐿️</div>
                <p className={`text-sm font-medium leading-relaxed whitespace-pre-line ${getEnergyColor(level)}`}>
                    {HEALING_SCRIPTS[level]}
                </p>
             </div>
         )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-4 gap-3 relative z-10">
        {OPTIONS.map((opt) => {
           const isSelected = level === opt.val;
           const colorClass = getEnergyColor(opt.val);
           return (
            <button
              key={opt.val}
              onClick={() => onLevelSelect(opt.val)}
              className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                isSelected 
                  ? `bg-zinc-800 border-zinc-600 scale-[1.05] shadow-xl` 
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
              }`}
            >
              <span className={`text-2xl mb-2 transition-transform group-hover:scale-110 ${isSelected ? 'scale-110' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                {opt.emoji}
              </span>
              <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{opt.val}%</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-600 mt-1">{opt.sub}</span>
              
              {isSelected && <div className={`absolute inset-0 opacity-10 ${colorClass.replace('text-', 'bg-')}`} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
