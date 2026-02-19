export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number; // epoch ms
  initialParams:any
}

export interface ChatRequest {
  initialParams: any;
  messages: Array<{ role: ChatRole; content: string }>;
}

export interface ChatResponse {
  role: 'assistant';
  content: string;
}
