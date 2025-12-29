
import { GoogleGenAI } from "@google/genai";
import { FrequencyLayer } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getArchitecturalInsight = async (frequency: FrequencyLayer) => {
  const prompts = {
    [FrequencyLayer.VISION]: "Provide a cryptic, one-sentence metaphysical insight about the nature of observation and reality. Use architectural metaphors.",
    [FrequencyLayer.TECHNICAL]: "Explain the geometric necessity of a 4D-tesseract projection in a 2D space in one highly technical sentence.",
    [FrequencyLayer.CORE]: "Provide a single line of cryptic pseudocode that represents the collapse of a probability field into binary data."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompts[frequency],
      config: {
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 100
      }
    });

    return response.text;
  } catch (error) {
    console.error("Zenith Core Error:", error);
    return "THE ARCHITECT IS SILENT.";
  }
};
