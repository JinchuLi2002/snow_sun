
import React, { useState } from 'react';
import { Moon, CloudRain, ShieldAlert, CloudFog, Scale, Stethoscope } from 'lucide-react';
import { EnergyLevel, StrategyType, StrategyData } from '../types';
import { STRATEGIES } from '../constants';

interface MorningTriageProps {
  onComplete: (level: EnergyLevel, strategy: StrategyData) => void;
}

export const MorningTriage: React.FC<MorningTriageProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  // State for calculation
  const [baseEnergy, setBaseEnergy] = useState(100);
  const [loadLevel, setLoadLevel] = useState(0); 

  // Helper to advance step
  const nextStep = (energyDelta: number, setLoad?: number) => {
    if (setLoad !== undefined) setLoadLevel(setLoad);
    setBaseEnergy(prev => Math.max(0, Math.min(100, prev + energyDelta)));
    
    if (step < 5) {
      setStep(step + 1);
    } else {
      calculateStrategy(baseEnergy + energyDelta, setLoad !== undefined ? setLoad : loadLevel);
    }
  };

  const calculateStrategy = (finalEnergy: number, finalLoad: number) => {
    let level = EnergyLevel.MAINTENANCE;
    if (finalEnergy <= 30) level = EnergyLevel.CRITICAL;
    else if (finalEnergy <= 50) level = EnergyLevel.SURVIVAL;
    else if (finalEnergy <= 80) level = EnergyLevel.MAINTENANCE;
    else level = EnergyLevel.SPRINT;

    let sType = StrategyType.MAINTENANCE;

    if (finalEnergy <= 40) {
        if (finalLoad >= 2) sType = StrategyType.CRISIS;
        else sType = StrategyType.REST;
    } else if (finalEnergy <= 70) {
        if (finalLoad >= 2) sType = StrategyType.ECO_DRIVE;
        else sType = StrategyType.MAINTENANCE;
    } else {
        if (finalLoad <= 1) sType = StrategyType.DEEP_DIVE;
        else sType = StrategyType.ECO_DRIVE;
    }

    onComplete(level, { type: sType, ...STRATEGIES[sType] });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#09090b] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 border border-zinc-700">
             <span className="text-3xl">🐿️</span>
             <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1 border-2 border-zinc-900">
                 <Stethoscope size={14} className="text-white" />
             </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Dr. 松鼠晨间查房</h2>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">Atlanta 06:00 Sync • 每日生存诊断</p>
          
          <div className="flex justify-center gap-1 mt-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? 'bg-orange-600' : 'bg-zinc-800'}`} />
            ))}
          </div>
        </div>

        {/* Q1: Sleep */}
        {step === 1 && (
          <StepContainer icon={<Moon size={40} className="text-blue-500" />} title="Q1. 昨晚睡得怎么样？ 🛏️">
             <OptionBtn onClick={() => nextStep(-50)} label="💀 极差 / 凌晨早醒" sub="(-2 🌰)" />
             <OptionBtn onClick={() => nextStep(-20)} label="🥱 一般 / 没睡透" sub="(-1 🌰)" />
             <OptionBtn onClick={() => nextStep(0)} label="✨ 还不错 / 睡饱了" sub="(满电)" />
          </StepContainer>
        )}

        {/* Q2: Mood */}
        {step === 2 && (
          <StepContainer icon={<CloudRain size={40} className="text-purple-500" />} title="Q2. 此刻的情绪底色？ 🌧️">
             <OptionBtn onClick={() => nextStep(-20)} label="🌧️ 沉重 / 焦虑 / 不想动" />
             <OptionBtn onClick={() => nextStep(0)} label="☁️ 平静 / 无感" />
             <OptionBtn onClick={() => nextStep(10)} label="☀️ 积极 / 有点期待" />
          </StepContainer>
        )}

        {/* Q3: Resistance */}
        {step === 3 && (
          <StepContainer icon={<ShieldAlert size={40} className="text-orange-500" />} title="Q3. 想到开始工作的反应？ 🧱">
             <OptionBtn onClick={() => nextStep(-20)} label="🧱 像有一堵墙 (极度抗拒)" />
             <OptionBtn onClick={() => nextStep(0)} label="👟 一般，可以试试" />
             <OptionBtn onClick={() => nextStep(10)} label="🚀 有点想开始 / 跃跃欲试" />
          </StepContainer>
        )}

        {/* Q4: Brain Fog */}
        {step === 4 && (
          <StepContainer icon={<CloudFog size={40} className="text-pink-500" />} title="Q4. 大脑现在的清晰度？ 🌫️">
             <OptionBtn onClick={() => nextStep(-20)} label="🌫️ 浆糊 / 严重的脑雾" />
             <OptionBtn onClick={() => nextStep(0)} label="💡 正常状态" />
             <OptionBtn onClick={() => nextStep(10)} label="✨ 极度清晰 / 敏锐" />
          </StepContainer>
        )}

        {/* Q5: External Load */}
        {step === 5 && (
          <StepContainer icon={<Scale size={40} className="text-red-500" />} title="Q5. 今天劳务搬运工作多吗？ 💣">
             <div className="grid grid-cols-2 gap-3 w-full">
                <OptionBtn onClick={() => nextStep(0, 0)} label="☕️ 不多" />
                <OptionBtn onClick={() => nextStep(0, 1)} label="📝 一般" />
                <OptionBtn onClick={() => nextStep(0, 2)} label="🔥 较多" />
                <OptionBtn onClick={() => nextStep(0, 3)} label="💣 爆表" />
             </div>
          </StepContainer>
        )}

      </div>
    </div>
  );
};

interface StepContainerProps {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}

const StepContainer: React.FC<StepContainerProps> = ({ icon, title, children }) => (
    <div className="flex flex-col items-center animate-in slide-in-from-right duration-300 w-full">
        <div className="mb-6 bg-zinc-800/50 p-4 rounded-full border border-zinc-700">{icon}</div>
        <h3 className="text-xl text-zinc-200 font-bold mb-8">{title}</h3>
        <div className="flex flex-col gap-3 w-full">
            {children}
        </div>
    </div>
);

interface OptionBtnProps {
  onClick: () => void;
  label: string;
  sub?: string;
}

const OptionBtn: React.FC<OptionBtnProps> = ({ onClick, label, sub }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between px-6 py-4 bg-zinc-800 rounded-xl hover:bg-zinc-700 hover:scale-[1.02] transition-all border border-transparent hover:border-zinc-600 w-full text-left group"
  >
    <span className="text-base font-medium text-zinc-300 group-hover:text-white transition-colors">{label}</span>
    {sub && <span className="text-zinc-500 text-xs font-mono">{sub}</span>}
  </button>
);
