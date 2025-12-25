
import { GoogleGenAI, Type } from "@google/genai";
import { BudgetItem } from "../types";

// Função para obter o cliente AI de forma segura
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY não encontrada em process.env");
  }
  return new GoogleGenAI({ apiKey: apiKey as string });
};

export const analyzeBudgetPhoto = async (base64Image: string): Promise<BudgetItem[]> => {
  const ai = getAIClient();
  const modelName = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model: modelName,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "Analyze this image of a budget or product list. Extract all items in their original visual order. For each item, identify: 'quantity' (number), 'description' (string), and 'unitPrice' (number). If quantity is not specified, use 1. If unit price is not specified, use 0. Return a JSON array of objects.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            quantity: { type: Type.NUMBER, description: "The quantity of the item" },
            description: { type: Type.STRING, description: "The name or description of the product" },
            unitPrice: { type: Type.NUMBER, description: "The unit price if available, otherwise 0" },
          },
          required: ["quantity", "description", "unitPrice"],
        },
      },
    },
  });

  const text = response.text || "[]";
  const parsedItems: any[] = JSON.parse(text);
  
  return parsedItems.map((item, index) => ({
    id: `item-${Date.now()}-${index}`,
    quantity: item.quantity || 1,
    description: item.description || "Produto sem descrição",
    unitPrice: item.unitPrice || 0,
  }));
};
