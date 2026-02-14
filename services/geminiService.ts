import { GoogleGenAI, Type } from "@google/genai";

function getApiKey(): string | undefined {
  // Prefer Vite-style env if you later add it:
  const viteKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY as string | undefined;
  // Fallback to your current define() hack:
  const legacyKey =
    (process.env as any)?.API_KEY as string | undefined ||
    (process.env as any)?.GEMINI_API_KEY as string | undefined;

  const key = (viteKey || legacyKey || "").trim();
  return key ? key : undefined;
}

let _ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  const key = getApiKey();
  if (!key) return null;           // ✅ Gemini disabled
  if (_ai) return _ai;
  _ai = new GoogleGenAI({ apiKey: key });
  return _ai;
}

export const getMicroSteps = async (task: string): Promise<string[]> => {
  const ai = getAI();
  if (!ai) {
    // ✅ no key on Pages => still works
    return [
      "1. 坐到椅子上 🐾",
      "2. 深呼吸一口气 💨",
      "3. 把手放到键盘上 ⌨️",
      "4. 打开软件，只写第一个字 🌰"
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是一个治疗“启动瘫痪”的松鼠医生。用户想做任务："${task}"，但动不了。
请给出 4-5 个**极度简单、物理层面**的破冰动作，引导他们开始。

风格要求：
1. 语气像一只鼓励人的小松鼠，带上 Emoji (🐾, 🌰)。
2. 步骤必须从“身体动作”开始，而不是“思考”。

请用 JSON 格式返回。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            steps: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const data = JSON.parse(response.text);
    return data.steps || [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      "1. 坐到椅子上 🐾",
      "2. 深呼吸一口气 💨",
      "3. 打开你的 Zotero/Word 📄",
      "4. 只看/写第一行 🌰"
    ];
  }
};

export const getEnergyAdvice = async (level: number): Promise<string> => {
  const ai = getAI();
  if (!ai) {
    return "Gemini 已在公开演示版中关闭；你可以先做最机械的一步，或者直接休息。";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `用户当前的精力电量为 ${level}%。请给出一句简短、温柔、有支持感的话。请用中文回复。`
    });
    return response.text.trim();
  } catch {
    return "只要你还在努力，就已经做得很好了。";
  }
};
