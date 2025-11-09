import type React from 'react';

export type UserProfile = 'learner' | 'adult';

// To specify what kind of output the tutor is expected to generate
export type TutorOutputType = 'text' | 'career_card' | 'study_method_card' | 'digital_skill_card' | 'video_generation' | 'audio_transcription' | 'sign_language_translation' | 'type_to_speak';

export interface Tutor {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  systemInstruction?: string;
  profiles: UserProfile[];
  sampleQuestions?: string[];
  model?: string;
  config?: Record<string, any>;
  outputType?: TutorOutputType;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  // For special cards
  careers?: Career[];
  studySubjects?: StudySubject[];
  digitalSkills?: DigitalSkill[];
  isThinking?: boolean;
  // For video generation
  videoGenerationStatus?: 'generating' | 'done' | 'failed';
  videoUrl?: string;
  // For sign language
  signLanguageContent?: Sign[];
}

export interface Sign {
  word: string;
  signImageUrl: string;
}

export interface Career {
  careerName: string;
  description: string;
  imageURL: string;
  videoURL: string;
  salaryRange: string;
  educationLevel: string;
  learningPath: {
    tutorId: string;
    reason: string;
  }[];
}

export interface StudySubject {
  subjectName: string;
  videoURL: string;
  studyMethods: {
    technique: string;
    description: string;
  }[];
}

export interface DigitalSkill {
  skillName: string;
  imageURL: string;
  videoURL: string;
  introduction: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
}

export type ChatHistory = {
    role: 'user' | 'model';
    parts: { text: string }[];
}[];

// Fix: Moved window.aistudio declaration here to centralize the type and avoid redeclaration errors.

declare global {
  interface Window {
    // Fix: Inlined the aistudio type to resolve a conflict with duplicate declarations.
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
