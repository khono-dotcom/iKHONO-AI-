import { GoogleGenAI, Chat, Type } from '@google/genai';
import type { Tutor, ChatHistory, Career, StudySubject, DigitalSkill, Sign } from '../types';

let ai: GoogleGenAI;
const getAi = () => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

const chatCache = new Map<string, Chat>();

export function getOrCreateChat(tutor: Tutor, history: ChatHistory = []): Chat {
    if (chatCache.has(tutor.id)) {
        return chatCache.get(tutor.id)!;
    }
    const newChat = getAi().chats.create({
        model: tutor.model || 'gemini-2.5-flash',
        history: history,
        config: {
            systemInstruction: tutor.systemInstruction,
            ...tutor.config,
        }
    });
    chatCache.set(tutor.id, newChat);
    return newChat;
}

export function resetChat(tutorId: string) {
    chatCache.delete(tutorId);
}

export async function streamChat(chat: Chat, message: string): Promise<AsyncGenerator<string>> {
    const result = await chat.sendMessageStream({ message });
    async function* downstream() {
        for await (const chunk of result) {
            yield chunk.text;
        }
    }
    return downstream();
}

const parseJsonResponse = <T>(jsonString: string): T | null => {
    try {
        const cleanedJsonString = jsonString.replace(/^```json\n?|```$/g, '');
        return JSON.parse(cleanedJsonString);
    } catch (error) {
        console.error('Failed to parse JSON response:', jsonString, error);
        return null;
    }
};

export const getCareerSuggestions = async (prompt: string): Promise<Career[]> => {
    const response = await getAi().models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    careers: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                careerName: { type: Type.STRING },
                                description: { type: Type.STRING },
                                imageURL: { type: Type.STRING },
                                videoURL: { type: Type.STRING },
                                salaryRange: { type: Type.STRING },
                                educationLevel: { type: Type.STRING },
                                learningPath: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            tutorId: { type: Type.STRING },
                                            reason: { type: Type.STRING },
                                        },
                                        required: ['tutorId', 'reason']
                                    }
                                }
                            },
                             required: ['careerName', 'description', 'imageURL', 'videoURL', 'salaryRange', 'educationLevel', 'learningPath']
                        }
                    }
                },
                required: ['careers']
            }
        }
    });
    const result = parseJsonResponse<{ careers: Career[] }>(response.text);
    return result?.careers || [];
}

export const getStudyMethods = async (prompt: string): Promise<StudySubject[]> => {
     const response = await getAi().models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    studySubjects: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                subjectName: { type: Type.STRING },
                                videoURL: { type: Type.STRING },
                                studyMethods: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            technique: { type: Type.STRING },
                                            description: { type: Type.STRING }
                                        },
                                        required: ['technique', 'description']
                                    }
                                }
                            },
                            required: ['subjectName', 'videoURL', 'studyMethods']
                        }
                    }
                },
                required: ['studySubjects']
            }
        }
    });
    const result = parseJsonResponse<{ studySubjects: StudySubject[] }>(response.text);
    return result?.studySubjects || [];
}

export const getDigitalSkillGuide = async (prompt: string): Promise<DigitalSkill[]> => {
    const response = await getAi().models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    digitalSkills: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                skillName: { type: Type.STRING },
                                imageURL: { type: Type.STRING },
                                videoURL: { type: Type.STRING },
                                introduction: { type: Type.STRING },
                                steps: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            stepNumber: { type: Type.INTEGER },
                                            title: { type: Type.STRING },
                                            description: { type: Type.STRING }
                                        },
                                        required: ['stepNumber', 'title', 'description']
                                    }
                                }
                            },
                            required: ['skillName', 'imageURL', 'videoURL', 'introduction', 'steps']
                        }
                    }
                },
                required: ['digitalSkills']
            }
        }
    });
    const result = parseJsonResponse<{ digitalSkills: DigitalSkill[] }>(response.text);
    return result?.digitalSkills || [];
};

export const getSignLanguageTranslation = async (text: string): Promise<Sign[]> => {
    const response = await getAi().models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Translate the following text into a sequence of South African Sign Language (SASL) signs. Provide clear, publicly accessible image URLs for each sign. Text: "${text}"`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    signLanguageContent: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                word: { type: Type.STRING },
                                signImageUrl: { type: Type.STRING }
                            },
                            required: ['word', 'signImageUrl']
                        }
                    }
                },
                required: ['signLanguageContent']
            }
        }
    });
    const result = parseJsonResponse<{ signLanguageContent: Sign[] }>(response.text);
    return result?.signLanguageContent || [];
};


export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16') => {
    let operation = await getAi().models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio
        }
    });
    return operation;
};

export const getGeneratedVideo = async (operation: any) => {
    return await getAi().operations.getVideosOperation({ operation: operation });
}

export const transcribeAudio = async (audioBase64: string): Promise<string> => {
    const audioPart = {
        inlineData: {
            mimeType: 'audio/webm',
            data: audioBase64,
        },
    };
    const response = await getAi().models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [audioPart, {text: "Transcribe this audio."}] },
    });
    return response.text;
};

export const textToSpeech = async (text: string): Promise<string> => {
    const response = await getAi().models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || '';
};
