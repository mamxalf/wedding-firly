"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-gray-500">
        <p>{error}</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        <p>Be the first to leave a message for the couple!</p>
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
          className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
          variants={itemVariants}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-medium text-lg">{message.name}</h3>
            {/* <Heart className="h-4 w-4 text-gray-400" /> */}
          </div>
          <p className="text-gray-700 mb-3">{message.message}</p>
          <p className="text-xs text-gray-400">
            {new Date(message.created_at).toLocaleDateString()}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
