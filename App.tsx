import React, { useState, useEffect } from 'react';
import { AppMode, EnergyLevel, StrategyData, StrategyType, RamEntry } from './types';
import { MODE_THRESHOLD_HOURS } from './constants';
import { ShelterMode } from './components/ShelterMode';
import { EnergyAudit } from './components/EnergyAudit';
import { MicroIgnition } from './components/MicroIgnition';
import { ExternalRAM } from './components/ExternalRAM';
import { SquirrelPocket } from './components/SquirrelPocket';
import { MorningTriage } from './components/MorningTriage';
import { KingSquirrelPoet } from './components/KingSquirrelPoet';
import { Shield, Target, Anchor, Leaf, Compass, Nut, MapPin, Stethoscope } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.COCKPIT);
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | null>(null);
  const [strategy, setStrategy] = useState<StrategyData | null>(null);
  const [showTriage, setShowTriage] = useState(true);
  const [atlantaTimeStr, setAtlantaTimeStr] = useState("");
  
  // Lifted state for Squirrel Pocket
  const [ramEntries, setRamEntries] = useState<RamEntry[]>([]);

  // Helper: Get Current Atlanta Time Date Object
  const getAtlantaDate = () => {
    const now = new Date();
    // Create date string for Atlanta
    const atlString = now.toLocaleString("en-US", {timeZone: "America/New_York"});
    return new Date(atlString);
  };

  // Helper: Get Operational "Day" string (Resets at 6 AM ATL)
  const getOperationalDateString = () => {
    const atlDate = getAtlantaDate();
    if (atlDate.getHours() < 6) {
        atlDate.setDate(atlDate.getDate() - 1);
    }
    return atlDate.toDateString();
  };

  useEffect(() => {
    const lastTriageDate = localStorage.getItem('_last_triage_date');
    const currentOpDate = getOperationalDateString();
    
    // DAILY RESET LOGIC
    if (lastTriageDate !== currentOpDate) {
       // New Day detected: Show Triage AND Clear Pocket
       setShowTriage(true);
       
       // Clear Pocket (Reset Logic)
       localStorage.removeItem('_ram_entries');
       setRamEntries([]);
       
    } else {
       // Same Day: Load existing state
       setShowTriage(false);
       
       const savedLevel = localStorage.getItem('_energy_level');
       const savedStrat = localStorage.getItem('_strategy');
       const savedRam = localStorage.getItem('_ram_entries');
       
       if (savedLevel) setEnergyLevel(Number(savedLevel) as EnergyLevel);
       if (savedStrat) setStrategy(JSON.parse(savedStrat));
       if (savedRam) {
           try {
             setRamEntries(JSON.parse(savedRam));
           } catch (e) {
             console.error("Failed to parse RAM entries", e);
             setRamEntries([]);
           }
       }
    }
  }, []);

  useEffect(() => {
    const checkTime = () => {
        const atlDate = getAtlantaDate();
        setAtlantaTimeStr(atlDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        
        const hour = atlDate.getHours();
        // Shelter Mode: 3 AM - 6 AM Atlanta Time
        if (hour >= MODE_THRESHOLD_HOURS.START && hour < MODE_THRESHOLD_HOURS.END) {
            setMode(AppMode.SHELTER);
        } else {
            setMode(AppMode.COCKPIT);
        }
    };
    
    const timer = setInterval(checkTime, 1000);
    checkTime(); 
    return () => clearInterval(timer);
  }, []);

  const handleTriageComplete = (level: EnergyLevel, strat: StrategyData) => {
    setEnergyLevel(level);
    setStrategy(strat);
    setShowTriage(false);
    
    // Save state
    localStorage.setItem('_last_triage_date', getOperationalDateString());
    localStorage.setItem('_energy_level', level.toString());
    localStorage.setItem('_strategy', JSON.stringify(strat));
  };

  const handleManualLevelChange = (level: EnergyLevel) => {
    setEnergyLevel(level);
    localStorage.setItem('_energy_level', level.toString());
  };

  // Add Item to Pocket
  const handleAddRamEntry = (text: string) => {
      const newEntry: RamEntry = {
          id: Math.random().toString(36).substr(2, 9),
          text: text,
          timestamp: Date.now()
      };
      const updatedEntries = [newEntry, ...ramEntries];
      setRamEntries(updatedEntries);
      localStorage.setItem('_ram_entries', JSON.stringify(updatedEntries));
  };

  if (mode === AppMode.SHELTER) {
    return <ShelterMode />;
  }

  // Helper to clean advice text (remove "医生建议：" prefix)
  const cleanAdvice = (text: string) => {
      return text.replace(/医生.*建议：\n?/, '').trim();
  };

  return (
    <div className="min-h-screen pb-32 pt-8 px-4 md:px-6 max-w-6xl mx-auto relative font-sans">
      {showTriage && <MorningTriage onComplete={handleTriageComplete} />}
      
      {/* 1. Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center border-b border-zinc-800 pb-4 gap-4">
         <div className="flex items-center gap-2 text-zinc-400 mono text-xs uppercase tracking-[0.1em]">
            <span className="text-xl">🐿️</span>
            <span>V17.0</span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded text-orange-400 font-bold ml-2">ATL SYNC</span>
         </div>
         <div className="flex gap-4 items-center justify-between md:justify-end">
            <div className="text-zinc-500 text-sm mono flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                <MapPin size={12} className="text-blue-500" />
                <span>ATL {atlantaTimeStr}</span>
            </div>
         </div>
      </header>

      {/* 2. Full-Width "Hero" Stack (Poetry + Strategy) */}
      <div className="flex flex-col gap-6 mb-6">
          
          {/* A. Squirrel Poetry Society */}
          <KingSquirrelPoet />

          {/* B. Strategy Card (Full Width) */}
          {strategy && (
            <div className={`p-6 rounded-3xl border shadow-2xl relative overflow-hidden transition-colors duration-500 ${
                    strategy.type === StrategyType.CRISIS ? 'bg-red-950/10 border-red-900/30' :
                    strategy.type === StrategyType.REST ? 'bg-blue-950/10 border-blue-900/30' :
                    strategy.type === StrategyType.ECO_DRIVE ? 'bg-yellow-950/10 border-yellow-900/30' :
                    strategy.type === StrategyType.DEEP_DIVE ? 'bg-indigo-950/10 border-indigo-900/30' :
                    'bg-zinc-900 border-zinc-800'
            }`}>
                <div className="flex flex-col gap-4">
                    {/* Top Row: Icon and Title aligned horizontally */}
                    <div className="flex items-center gap-4">
                        {/* Icon Box */}
                        <div className="shrink-0 p-3 bg-zinc-950/50 rounded-xl border border-white/5 shadow-sm">
                            {strategy.type === StrategyType.CRISIS ? <Shield size={24} className="text-red-500" /> :
                                strategy.type === StrategyType.REST ? <Anchor size={24} className="text-blue-400" /> :
                                strategy.type === StrategyType.ECO_DRIVE ? <Leaf size={24} className="text-yellow-500" /> :
                                strategy.type === StrategyType.DEEP_DIVE ? <Compass size={24} className="text-indigo-400" /> :
                                <Target size={24} className="text-zinc-400" />
                            }
                        </div>
                        
                        {/* Title Section */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-zinc-100 leading-tight">{strategy.title}</h2>
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 mt-0.5">
                                <span>战略部处方笺</span>
                                <span className="text-zinc-700">|</span>
                                <span>VALID UNTIL 06:00 ATL</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Advice Section */}
                    <div className="mt-1 pl-1">
                            <div className="flex items-center gap-2 mb-2">
                            <Stethoscope size={14} className="text-zinc-500" />
                            <span className="text-xs font-bold text-zinc-400">Dr. 松鼠建议</span>
                            </div>
                            <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-line font-medium pl-4 border-l-2 border-zinc-800/50">
                            {cleanAdvice(strategy.advice)}
                            </p>
                    </div>
                </div>
            </div>
          )}
      </div>

      {/* 3. Dashboard Grid (Split Columns) */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Tactical Dept (Energy Battery) */}
        <section className="lg:col-span-5 space-y-6">
            <EnergyAudit level={energyLevel} onLevelSelect={handleManualLevelChange} />
        </section>

        {/* RIGHT: Permanent Tools */}
        <section className="lg:col-span-7 space-y-6 flex flex-col gap-6">
            
            {/* 1. Micro Ignition (Nudge First) */}
            <MicroIgnition />

            {/* 2. Squirrel's Pocket (Storage Second) */}
            <SquirrelPocket entries={ramEntries} />

            {/* 3. Deep Work Area (Only visible in Sprint) */}
            {energyLevel === EnergyLevel.SPRINT && (
                <div className="p-6 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-3xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-4">
                    <div>
                        <h3 className="text-lg font-bold text-emerald-100 flex items-center gap-2">
                             <Nut size={18} /> 深度写作区
                        </h3>
                        <p className="text-emerald-200/50 text-xs">Dr. Squirrel 正在为你护航</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-emerald-900/20">
                        进入 Flow
                    </button>
                </div>
            )}
            
            {/* Low Energy Message */}
            {(energyLevel === EnergyLevel.CRITICAL || energyLevel === EnergyLevel.SURVIVAL) && (
                 <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 border-dashed text-center">
                    <p className="text-zinc-600 text-xs">
                        *深度工作区已隐藏。Dr. 松鼠说：保护好自己，活着就是胜利。
                    </p>
                </div>
            )}
        </section>

      </main>

      {/* Cheek Pouch (Input) */}
      <ExternalRAM onSave={handleAddRamEntry} />

    </div>
  );
};

export default App;