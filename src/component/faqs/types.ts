// src/component/faqs/types.ts

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface FaqContent {
  id: number;
  title: string;
  description: string;
  created_at: string | null;
  updated_at: string;
}

export interface FaqsState {
  isLoading: boolean;
  error: string | null;
  faqContent: FaqContent | null;
  data: FaqItem[];
}