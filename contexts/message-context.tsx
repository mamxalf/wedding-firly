"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Message = {
  name: string;
  message: string;
  created_at: string;
};

type MessageContextType = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  };

  return (
    <MessageContext.Provider value={{ messages, setMessages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
}
