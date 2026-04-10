import { useState, useCallback } from "react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: ChatMessage = { role: "user", content };
      const updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        if (!res.ok) {
          throw new Error("Failed to get response");
        }

        const data = await res.json();
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.message,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        const errorMessage: ChatMessage = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, sendMessage, isLoading, clearMessages };
}
