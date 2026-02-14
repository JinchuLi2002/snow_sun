import React from 'react';
import { RamEntry } from '../types';

interface SquirrelPocketProps {
  entries: RamEntry[];
}

export const SquirrelPocket: React.FC<SquirrelPocketProps> = ({ entries }) => {
  // Updated SVG for background (lower opacity 0.08)
  const bgPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' font-size='14' opacity='0.08'%3E🌰%3C/text%3E%3Ctext x='40' y='50' font-size='12' opacity='0.08'%3E🍂%3C/text%3E%3C/svg%3E`;

  return (
    <div 
      className="bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-2xl p-6 relative overflow-hidden min-h-[100px] flex flex-col transition-all duration-500 hover:border-zinc-600"
      style={{
        backgroundImage: `url("${bgPattern}")`,
        backgroundRepeat: 'repeat'
      }}
    >
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
            <span className="text-xl">🐿️</span>
            <h3 className="text-sm font-bold text-zinc-400">今日口袋 (Pocket)</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 font-bold bg-zinc-800/50 px-2 py-1 rounded">
            {entries.length} 枚
        </span>
      </div>
      
      {/* Content */}
      <div className="flex-1 relative z-10">
        {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-20 text-zinc-600 text-center space-y-2">
                <p className="text-xs italic">里面还没有松果...</p>
            </div>
        ) : (
            <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1 -mr-1 custom-scrollbar">
            {entries.map((entry) => (
                <li 
                  key={entry.id} 
                  className="text-sm text-zinc-200 bg-zinc-950/80 backdrop-blur-sm px-3 py-2.5 rounded-lg border border-zinc-800 flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300 shadow-sm"
                >
                    <span className="leading-relaxed break-words">{entry.text}</span>
                </li>
            ))}
            </ul>
        )}
      </div>
    </div>
  );
};