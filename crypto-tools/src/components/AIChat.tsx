"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './AIChat.module.css';
import { cryptoKnowledge, fallbackResponses } from '@/lib/ai-knowledge';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    isStreaming?: boolean;
}

const AIChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentStep]);

    // Function to simulate typing effect
    const streamResponse = async (fullText: string, messageId: string) => {
        const words = fullText.split(' ');
        let accumulatedText = "";

        for (let i = 0; i < words.length; i++) {
            accumulatedText += words[i] + " ";

            // Update the message content in real-time
            setMessages(prev => prev.map(msg =>
                msg.id === messageId
                    ? { ...msg, content: accumulatedText }
                    : msg
            ));

            // Random delay between words for realistic typing
            await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 20));
        }

        // Mark as done streaming
        setMessages(prev => prev.map(msg =>
            msg.id === messageId
                ? { ...msg, isStreaming: false, content: fullText } // Ensure full text is set cleanly
                : msg
        ));
    };

    const findBestMatch = (query: string): string => {
        const lowerQuery = query.toLowerCase();

        let bestMatch = null;
        let maxHits = 0;

        // 1. Check specific topics with a scoring system
        for (const topic of cryptoKnowledge) {
            let hits = 0;

            // Check exact title match (Highest weight)
            if (topic.title.toLowerCase() === lowerQuery) hits += 10;
            // Check title partial match (bidirectional)
            else if (topic.title.toLowerCase().includes(lowerQuery) || lowerQuery.includes(topic.title.toLowerCase())) hits += 5;

            // Check keywords (weight = 1)
            for (const k of topic.keywords) {
                // Use Regex for whole word matching to avoid "s" matching "is"
                const escapedKeyword = k.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');

                if (regex.test(lowerQuery)) {
                    hits += 3; // Increase weight for confirmed keyword match
                }
            }

            // Boost if query mentions the category
            if (lowerQuery.includes(topic.category.toLowerCase())) hits += 2;

            // Update best match if this topic has more hits
            if (hits > maxHits) {
                maxHits = hits;
                bestMatch = `[${topic.category}] ${topic.title}\n\n${topic.content}`;
            }
        }

        if (bestMatch && maxHits > 0) return bestMatch;

        // 2. Returns complex fallback if no specific topic found
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    };

    const simulateReasoning = async () => {
        const steps = [
            "Initializing neural network...",
            "Scanning blockchain nodes...",
            "Analyzing on-chain data...",
            "Verifying smart contracts...",
            "Formulating response..."
        ];

        for (const step of steps) {
            setCurrentStep(step);
            await new Promise(resolve => setTimeout(resolve, 600)); // Wait 600ms per step
        }
        setCurrentStep(null);
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // 1. Simulate "Thinking" / "Hacking" process
        await simulateReasoning();

        // 2. Get Context from Local Brain
        const localContext = findBestMatch(userMessage.content);
        let responseText = localContext;
        let isGemini = false;

        // 3. Try Gemini API
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    context: localContext
                })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.text) {
                    responseText = data.text;
                    isGemini = true;
                }
            } else if (res.status === 401) {
                // unauthorized means no key
                responseText += "\n\n(⚠️ NOTE: Gemini API Key missing or invalid. Running in LOCAL MODE. Add key to .env.local for full intelligence.)";
            }
        } catch (error) {
            console.warn("Using local fallback:", error);
        }

        // 4. Create Placeholder Message
        const aiMessageId = (Date.now() + 1).toString();
        const aiMessage: Message = {
            id: aiMessageId,
            role: 'assistant',
            content: "", // Start empty
            isStreaming: true
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);

        // 5. Stream the response
        const prefix = isGemini ? "✨ [GEMINI UPLINK ESTABLISHED]\n\n" : "";
        await streamResponse(prefix + responseText, aiMessageId);
    };

    const handleExampleClick = (text: string) => {
        setInput(text);
        // We can create a synthetic event or just call the logic
        // But for React state updates to verify 'input' instantly for handleSend, it's safer to just set input
        // If we want auto send:
        // handleSend(); // This won't work because 'input' state hasn't updated in this closure yet.
        // So we keep it as just setInput.
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatWindow}>
                {messages.length === 0 && (
                    <div className={styles.welcome}>
                        <div className={styles.orbContainer}>
                            <div className={styles.orb}></div>
                            <div className={styles.orbRing}></div>
                            <div className={styles.orbRing2}></div>
                        </div>
                        <h2 className={styles.title}>LOXEE ORACLE v9.0</h2>
                        <p className={styles.subtitle}>// INITIALIZING NEURAL INTERFACE //</p>

                        <div className={styles.examples}>
                            <button className={styles.exampleCard} onClick={() => handleExampleClick("Explain Modular Blockchains like Celestia")}>
                                <div className={styles.cardIcon}>🧩</div>
                                <div>
                                    <div className={styles.cardTitle}>Deep Tech Analysis</div>
                                    <div className={styles.cardDesc}>Explain Modular vs Monolithic chains</div>
                                </div>
                            </button>
                            <button className={styles.exampleCard} onClick={() => handleExampleClick("Analysis on L2 Blast vs Arbitrum")}>
                                <div className={styles.cardIcon}>⚡</div>
                                <div>
                                    <div className={styles.cardTitle}>L2 Comparables</div>
                                    <div className={styles.cardDesc}>Blast vs Arbitrum vs Optimism</div>
                                </div>
                            </button>
                            <button className={styles.exampleCard} onClick={() => handleExampleClick("What is EigenLayer and Restaking?")}>
                                <div className={styles.cardIcon}>🔄</div>
                                <div>
                                    <div className={styles.cardTitle}>Defi Mechanics</div>
                                    <div className={styles.cardDesc}>Restaking & EigenLayer</div>
                                </div>
                            </button>
                            <button className={styles.exampleCard} onClick={() => handleExampleClick("I sent ETH to the wrong network")}>
                                <div className={styles.cardIcon}>🔧</div>
                                <div>
                                    <div className={styles.cardTitle}>Emergency Fix</div>
                                    <div className={styles.cardDesc}>Stuck txs, Hacks, Bridge issues</div>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}
                    >
                        {msg.role === 'assistant' ? (
                            <div style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
                        ) : msg.content}
                        {msg.isStreaming && <span className={styles.cursor}>|</span>}
                    </div>
                ))}

                {isLoading && currentStep && (
                    <div className={`${styles.message} ${styles.aiMessage} ${styles.loadingStep}`}>
                        <span className={styles.loadingIcon}>⚙️</span> {currentStep}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className={styles.inputArea} onSubmit={handleSend}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Command the Oracle..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                />
                <button type="submit" className={styles.sendButton} disabled={isLoading || !input.trim()}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default AIChat;
