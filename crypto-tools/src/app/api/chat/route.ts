import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "No API Key configured" },
                { status: 401 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const body = await req.json();
        const { message, context } = body;

        // Construct a structured prompt
        const systemInstruction = `
You are Loxee, an advanced AI crypto oracle. 
You are "The Brain" of this application.

CONTEXT FROM LOCAL DATABASE:
${context || "No specific local context found."}

INSTRUCTIONS:
1. Use the provided Context to ground your answer if relevant.
2. If the user asks about a specific token in the context, use those details.
3. Be concise, technical, and slightly futuristic/cyberpunk in tone.
4. If the context is empty and you know the answer from your general training, answer it.
5. If you don't know, say "Processing legacy archives... Data corrupted." or similar style.

USER QUERY:
${message}
        `;

        const result = await model.generateContent(systemInstruction);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
