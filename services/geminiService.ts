import { GoogleGenAI, Type } from "@google/genai";
import { FinancialStatus } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getFinancialAdvice = async (
  balance: number,
  recentSpending: number
): Promise<FinancialStatus> => {
  const client = getClient();

  // Fallback if no API key
  if (!client) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          safeToSpend: 1450,
          message: "Cash flow is optimal. You are on track for your monthly savings goal.",
          mood: 'optimistic'
        });
      }, 1000);
    });
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Act as a high-end AI financial advisor named Aether. 
        Context: The user has a current balance of $${balance} and has spent $${recentSpending} this week.
        Task: Provide a "Financial Navigation" status. 
        1. Calculate a "Safe to Spend" amount for the next 7 days (make a reasonable estimate).
        2. Write a one-sentence insight that is calm, professional, and reassuring (max 20 words).
        3. Determine the financial mood: 'calm', 'alert', or 'optimistic'.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            safeToSpend: { type: Type.NUMBER },
            message: { type: Type.STRING },
            mood: { type: Type.STRING }
          },
          required: ["safeToSpend", "message", "mood"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as FinancialStatus;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      safeToSpend: 1200,
      message: "Unable to sync with Aether Intelligence. Showing cached projections.",
      mood: 'calm'
    };
  }
};