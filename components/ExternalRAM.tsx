import React, { useState } from 'react';
import { Nut } from 'lucide-react';

interface ExternalRAMProps {
  onSave: (text: string) => void;
}

export const ExternalRAM: React.FC<ExternalRAMProps> = ({ onSave }) => {
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState("🐿️ 塞进颊囊：灵感、杂事... (回车存入口袋)");
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Send to App
    onSave(inputValue);
    
    // Clear input
    setInputValue('');
    
    // Feedback Logic: Change placeholder temporarily
    setPlaceholder("✅ 吞下去了，已存入口袋...");
    setTimeout(() => {
        setPlaceholder("🐿️ 塞进颊囊：灵感、杂事... (回车存入口袋)");
    }, 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent">
      <div className="max-w-2xl mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl flex items-center p-2 hover:border-zinc-600 transition-colors focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20"
        >
          <div className="pl-3 pr-2 text-zinc-500">
            <span className="text-2xl" role="img" aria-label="squirrel">🐿️</span>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-200 py-3 placeholder-zinc-600 font-medium transition-all"
          />
          <button 
            type="submit"
            className={`p-3 transition-colors rounded-xl ${inputValue.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-zinc-800/50 text-zinc-500 hover:text-indigo-400'}`}
          >
            <Nut size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};