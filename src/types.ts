// types.ts

import { Difficulty as PrismaDifficulty } from '@prisma/client';

export interface Problem {
    id: number;
    name: string;
    question: string;
    solution: string;
    difficulty: PrismaDifficulty;
    collectionId: number;
    creationDate: Date;
    type: string;
    interval: number;
    relearnInterval: number;
    ease: number;
    dueDate: Date;
    language: string;
    functionSignature: string;
    link: string;
    notes: string;
    againCount: number;
    hardCount: number;
    goodCount: number;
    easyCount: number;
  }
  
  export interface Collection {
    id: number;
    title: string;
    image: string;
    lastAdded: Date | null;
    userId: number;
    problems: Problem[];
    newCount: number;
    learningCount: number;
    reviewCount: number;
  }
