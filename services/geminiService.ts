import { GoogleGenAI } from "@google/genai";
import { Event, EventCategory, EventStatus, Review } from '../types';
import { PAST_YEAR_EVENTS_CONTEXT } from '../constants';

const apiKey = process.env.API_KEY || '';

// Safely initialize AI only if key exists, otherwise we handle errors gracefully
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateAssumedEvents = async (): Promise<Event[]> => {
  if (!ai) {
    console.warn("No API Key found for Gemini");
    return [];
  }

  try {
    const prompt = `
      Based on the following historical university event patterns, predict 3 "Assumed" or recurring events that might happen in the upcoming months (Assume current date is May 2025).
      
      Historical Context:
      ${PAST_YEAR_EVENTS_CONTEXT}

      Return ONLY a raw JSON array. Do not include markdown code blocks.
      Schema:
      [
        {
          "title": "string",
          "description": "string",
          "date": "YYYY-MM-DD",
          "category": "Tech" | "Cultural" | "Sports" | "Academic" | "Social" | "Career"
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return [];

    const predictions = JSON.parse(text);

    // Map to Event interface
    return predictions.map((pred: any, index: number) => ({
      id: `ai_pred_${index}`,
      title: pred.title,
      description: pred.description,
      date: pred.date,
      location: 'To Be Announced',
      organizer: 'University Administration (Projected)',
      category: pred.category as EventCategory,
      status: EventStatus.ASSUMED,
      imageUrl: `https://picsum.photos/seed/ai_pred_${index}/800/400`,
      isAiPredicted: true
    }));

  } catch (error) {
    console.error("Error generating assumed events:", error);
    return [];
  }
};

export const summarizeReviews = async (reviews: Review[]): Promise<string> => {
    if (!ai || reviews.length === 0) return "No AI summary available.";

    try {
        const reviewText = reviews.map(r => r.comment).join("\n");
        const prompt = `Summarize the student sentiment from these event reviews in 2 sentences. Focus on what they liked and disliked. Reviews:\n${reviewText}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        return response.text || "Could not generate summary.";
    } catch (e) {
        console.error(e);
        return "AI Summary unavailable.";
    }
}
