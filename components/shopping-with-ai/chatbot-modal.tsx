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
import { CloudCog, Send } from "lucide-react";
import { useGetPastOrdersHistoryQuery, useSendBookingChatMutation } from "@/redux/features/AIforGrocery/AIforGrocery";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedItems?: { name: string; quantity: number | string }[];
}

interface ChatbotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (
    name: string,
    quantity: number,
    source: "manual" | "chatbot",
  ) => void;
}

export function ChatbotModal({
  open,
  onOpenChange,
  onAddItem,
}: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // chat api 
    const [sendChat] = useSendBookingChatMutation()
    const { data: pastOrdersHistory } = useGetPastOrdersHistoryQuery(undefined)

    console.log("pastOrdersHistory", pastOrdersHistory)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    console.log("input", input)

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
    // Simulate AI response delay
    try {
      const res: any = await sendChat({ message: input });
      console.log("Chat API Response:", res);
   
      if (res?.data?.success) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: res?.data?.data?.response,
          suggestedItems: res?.data?.data?.items?.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
          })),
        };
        setMessages((prev) => [...prev, assistantMessage]);

      }
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false);
    }
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

                {/* Suggested Items */}
                {message.suggestedItems && message.suggestedItems.length > 0 && message.role === "assistant" && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                    {message.suggestedItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                         <div className="text-sm">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-slate-500 ml-1">({item.quantity})</span>
                         </div>
                        <Button
                          onClick={() => {
                             const qty = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity as string) || 1;
                             handleAddSuggestedItem({ name: item.name, quantity: qty });
                          }}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 h-8"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
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
