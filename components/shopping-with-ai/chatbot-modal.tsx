"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedItem?: { name: string; quantity: number };
}

interface ChatbotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (
    name: string,
    quantity: number,
    source: "manual" | "chatbot"
  ) => void;
}

export function ChatbotModal({
  open,
  onOpenChange,
  onAddItem,
}: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI Shopping Assistant. I can help you refine your shopping list by asking about brand preferences, quantities, and special requirements. What would you like help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate AI responses with item suggestions
  const generateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    // Simple pattern matching to suggest items
    if (lowerMessage.includes("milk")) {
      return {
        text: "Great! I'd suggest 2 liters of whole milk. Does that work for you?",
        item: { name: "whole milk", quantity: 2 },
      };
    }
    if (lowerMessage.includes("bread")) {
      return {
        text: "Whole grain bread is a good choice. How many loaves would you like?",
        item: { name: "whole grain bread", quantity: 1 },
      };
    }
    if (lowerMessage.includes("eggs")) {
      return {
        text: "I recommend a dozen eggs. Shall I add that to your list?",
        item: { name: "eggs", quantity: 12 },
      };
    }
    if (
      lowerMessage.includes("vegetables") ||
      lowerMessage.includes("veggies")
    ) {
      return {
        text: "Would you like me to suggest some fresh vegetables? I could add carrots, broccoli, and spinach.",
        item: { name: "fresh vegetables mix", quantity: 1 },
      };
    }

    return {
      text: "Thanks for letting me know. What else would you like help with for your shopping list?",
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.text,
        suggestedItem: aiResponse.item,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  const handleAddSuggestedItem = (item: { name: string; quantity: number }) => {
    onAddItem(item.name, item.quantity, "chatbot");
    // Add confirmation message
    const confirmMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Perfect! I've added ${item.quantity} ${item.name} to your shopping list. Anything else?`,
    };
    setMessages((prev) => [...prev, confirmMessage]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            AI Shopping Assistant
          </DialogTitle>
          <p className="text-sm text-slate-600 mt-1">
            Refine your shopping preferences
          </p>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 !overflow-y-auto bg-slate-50 rounded-lg p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>

                {/* Suggested Item */}
                {message.suggestedItem && message.role === "assistant" && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <Button
                      onClick={() =>
                        handleAddSuggestedItem(message.suggestedItem!)
                      }
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add to List
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2 pt-4">
          <Input
            placeholder="Ask about brands, quantities, etc..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            className="border-slate-300"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-slate-900 hover:bg-slate-800 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
