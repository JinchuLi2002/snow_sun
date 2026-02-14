
import { StrategyType } from "./types";

export const COLORS = {
  bg: '#09090b',
  accent: '#3b82f6',
  critical: '#ef4444',
  low: '#f97316',
  medium: '#eab308',
  high: '#22c55e'
};

export const MODE_THRESHOLD_HOURS = {
  START: 3,
  END: 6
};

// Dr. Squirrel's Advice based on Energy Level
export const HEALING_SCRIPTS: Record<number, string> = {
  10: "🤕 受伤松鼠 (Injured)\n“吱... 系统过热！我强制你立刻停机。\n这不是偷懒，是生物学保护。\n请立刻离开电脑，把自己蜷缩起来休息。\n我会在这里守着你的颊囊。”",
  30: "🛌 冬眠松鼠 (Hibernating)\n“进入冬眠模式。外面风太大了，今天我们不出洞。\n不要碰费脑子的论文，只做机械劳动（下文献、理目录）。\n只要还没断电，你就已经很棒了。”",
  60: "🌰 觅食松鼠 (Foraging)\n“保持觅食节奏。状态稳健，但别贪多。\n每捡 25 分钟松果，必须休息 5 分钟。\n我会帮你盯着时间，别让自己透支。”",
  90: "🐿️ 飞鼠模式 (Flying)\n“飞鼠模式启动！风向完美，多巴胺满格！\n去挑战森林里最高、最难的那棵树吧。\n全速前进！”"
};

// Strategy Prescriptions
export const STRATEGIES: Record<StrategyType, { title: string, advice: string }> = {
  [StrategyType.CRISIS]: {
    title: "🚨 红色警报 (Crisis)",
    advice: "医生强制建议：\n今日止损。系统监测到高风险组合。\n只做唯一的急事，申请延期，保护好你的松果。"
  },
  [StrategyType.REST]: {
    title: "🛡️ 休养生息 (Rest)",
    advice: "医生建议：\n今日回血。安全期。\n彻底休息，不要因无事可做而焦虑。睡觉是第一生产力。"
  },
  [StrategyType.ECO_DRIVE]: {
    title: "⚠️ 节能战术 (Eco-Drive)",
    advice: "医生建议：\n资源紧缺。允许质量打折。\n强制番茄钟，完成即胜利，不要追求完美。"
  },
  [StrategyType.DEEP_DIVE]: {
    title: "🔭 深潜时刻 (Deep Dive)",
    advice: "医生建议：\n天赐良机。趁着状态好，攻克核心难题。\n不要浪费时间在回邮件这种杂事里。"
  },
  [StrategyType.MAINTENANCE]: {
    title: "⚓️ 稳态巡航 (Standard)",
    advice: "医生建议：\n一切正常。按部就班处理待办事项。\n保持呼吸，保持捡松果的节奏。"
  }
};
