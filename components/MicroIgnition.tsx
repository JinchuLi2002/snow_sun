
import React, { useState } from 'react';
import { Rocket, CheckCircle2, Loader2, ArrowRight, Footprints } from 'lucide-react';
import { getMicroSteps } from '../services/geminiService';

export const MicroIgnition: React.FC = () => {
  const [task, setTask] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const startIgnition = async () => {
    if (!task.trim()) return;
    setIsLoading(true);
    const result = await getMicroSteps(task);
    setSteps(result);
    setCurrentIndex(0);
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsDone(true);
    }
  };

  const reset = () => {
    setTask('');
    setSteps([]);
    setCurrentIndex(0);
    setIsDone(false);
  };

  if (isDone) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center animate-in zoom-in-95">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">松鼠：好啦！</h3>
        <p className="text-zinc-400 mb-6">惯性已经打破了，剩下的你自己慢慢来。我去树上等你。</p>
        <button 
          onClick={reset}
          className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors"
        >
          谢谢松鼠
        </button>
      </div>
    );
  }

  if (steps.length > 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-orange-500 transition-all duration-500" style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }} />
        
        <div className="flex justify-between items-start mb-6">
          <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <Footprints size={12} />
            松鼠领路中 {currentIndex + 1} / {steps.length}
          </span>
          <button onClick={reset} className="text-zinc-500 hover:text-white text-xs">取消</button>
        </div>

        <div className="mb-10 min-h-[100px] flex items-center justify-center text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-white leading-tight">
            {steps[currentIndex]}
          </h2>
        </div>

        <button
          onClick={nextStep}
          className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          {currentIndex === steps.length - 1 ? '我启动了！' : '做完了，下一步？'}
          <ArrowRight size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 relative">
        <div className="mb-4">
             <h2 className="text-lg font-bold text-zinc-200 flex items-center gap-2 mb-1">
                <Footprints size={18} className="text-orange-500" />
                松鼠的推一把 (Squirrel's Nudge)
             </h2>
             <p className="text-xs text-zinc-500">
                针对“启动瘫痪”。Dr. 松鼠带你做最简单的物理动作。
             </p>
        </div>

        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="卡在什么任务上了？(例如：写论文、回邮件)..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none h-24 mb-4 placeholder-zinc-700 text-sm"
        />
        
        <button
          onClick={startIgnition}
          disabled={isLoading || !task.trim()}
          className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <span className="text-xl">🐾</span>
              松鼠，帮我物理破冰
            </>
          )}
        </button>
      </div>
    </div>
  );
};
