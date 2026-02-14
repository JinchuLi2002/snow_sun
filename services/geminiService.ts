
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getMicroSteps = async (task: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一个治疗“启动瘫痪”的松鼠医生。用户想做任务："${task}"，但动不了。
      请给出 4-5 个**极度简单、物理层面**的破冰动作，引导他们开始。
      
      风格要求：
      1. 语气像一只鼓励人的小松鼠，带上 Emoji (🐾, 🌰)。
      2. 步骤必须从“身体动作”开始，而不是“思考”。
      
      示例步骤：
      1. 屁股坐到椅子上 🐾
      2. 深呼吸一口气 💨
      3. 把手放到键盘上 ⌨️
      4. 打开软件，只写第一个字 🌰
      
      请用 JSON 格式返回。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text);
    return data.steps || [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      "1. 坐到树洞里 (椅子上) 🐾",
      "2. 深呼吸一口气 💨",
      "3. 打开你的 Zotero/Word 📄",
      "4. 只看/写第一行 🌰"
    ];
  }
};

export const getEnergyAdvice = async (level: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `用户当前的精力电量为 ${level}%。他们是一位 24 岁的旅美博士生，正在应对 ADHD 和精力耗竭。
      请给出一句简短、温柔、有支持感的话。
      如果电量很低，请明确告诉他们“可以休息”或“只做机械性工作”。请用中文回复。`,
    });
    return response.text.trim();
  } catch (error) {
    return "只要你还在努力，就已经做得很好了。";
  }
};
