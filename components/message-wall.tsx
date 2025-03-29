"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMessages, Message } from "@/contexts/message-context";

export function MessageWall() {
  const { messages, setMessages } = useMessages();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/messages");

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();

        // Always merge with existing messages to avoid duplicates
        // If we already have messages in the context, we'll keep them and add any new ones from the database
        if (data.messages && data.messages.length > 0) {
          // Create a map of existing messages by a unique identifier (name + message + created_at)
          const existingMessagesMap = new Map(
            messages.map((msg: Message) => [
              `${msg.name}-${msg.message}-${msg.created_at}`,
              msg,
            ])
          );

          // Add only new messages that don't exist in our current state
          const newMessages = data.messages.filter(
            (msg: Message) =>
              !existingMessagesMap.has(
                `${msg.name}-${msg.message}-${msg.created_at}`
              )
          );

          if (newMessages.length > 0) {
            setMessages([...messages, ...newMessages]);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Could not load messages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMessages();
  }, [messages, setMessages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6 
      },
    },
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded-full mb-3"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-full mb-3"></div>
          <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="h-24 bg-gray-100 rounded-lg"></div>
            <div className="h-24 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 inline-block max-w-md mx-auto">
          <p className="text-red-500 mb-2 font-medium">Unable to load messages</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 inline-block max-w-md mx-auto">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-600 font-serif text-lg">Be the first to leave a message for the couple!</p>
          <p className="text-gray-500 text-sm mt-2">Share your love and well wishes below.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {messages.map((message, index) => (
        <motion.div
          key={index}
          className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gray-50 rounded-full opacity-20"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gray-50 rounded-full opacity-20"></div>
          
          {/* Top decorative line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-serif text-lg text-gray-800">{message.name}</h3>
            </div>
            
            <div className="w-12 h-px bg-gray-200 mb-4"></div>
            
            <p className="text-gray-700 mb-4 leading-relaxed italic">"{message.message}"</p>
            
            <p className="text-xs text-gray-400 flex items-center">
              <span className="inline-block w-3 h-px bg-gray-300 mr-2"></span>
              {new Date(message.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
          
          {/* Bottom decorative line */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </motion.div>
      ))}
    </motion.div>
  );
}
