
export enum AppMode {
  SHELTER = 'SHELTER',
  COCKPIT = 'COCKPIT'
}

export enum EnergyLevel {
  CRITICAL = 10,
  SURVIVAL = 30,
  MAINTENANCE = 60,
  SPRINT = 90
}

export enum StrategyType {
  CRISIS = 'CRISIS',         // Low Energy + High Load
  REST = 'REST',             // Low Energy + Low Load
  ECO_DRIVE = 'ECO_DRIVE',   // Mid Energy + High Load
  DEEP_DIVE = 'DEEP_DIVE',   // High Energy + Low/Mid Load
  MAINTENANCE = 'MAINTENANCE' // Fallback
}

export interface RamEntry {
  id: string;
  text: string;
  timestamp: number;
}

export interface StrategyData {
  type: StrategyType;
  title: string;
  advice: string;
}

export interface TaskStep {
  text: string;
  completed: boolean;
}
