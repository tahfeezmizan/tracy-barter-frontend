"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Check } from "lucide-react";
import { ShoppingListForm } from "./shopping-list-form";
import { ShoppingListDisplay } from "./shopping-list-display";
import { ChatbotModal } from "./chatbot-modal";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  source: "manual" | "chatbot";
}

export function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  // Add item from form or chatbot
  const addItem = (
    name: string,
    quantity: number,
    source: "manual" | "chatbot" = "manual"
  ) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      quantity,
      source,
    };
    setItems([...items, newItem]);
  };

  // Delete item
  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Handle submit - log to console
  const handleSubmit = () => {
    console.log("Shopping List Data:", {
      items,
      timestamp: new Date().toISOString(),
      totalItems: items.length,
    });
    alert("Shopping list submitted! Check the console for details.");
  };

  return (
    <div className=" py-8 px-4 " style={{ backgroundColor: "#fbf8f0" }}>
      <div className="max-w-3xl mx-auto px-4 py-32">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            AI-Powered Grocery Shopping
          </h1>
          <p className="text-lg text-slate-600">
            Create your shopping list and let our AI assistant help refine the
            details
          </p>
        </div>

        {/* Main Card */}
        <Card className="p-8 shadow-lg mb-8 bg-white">
          {/* Shopping List Section */}
          <div className="">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Your Shopping List
            </h2>
            <p className="text-sm text-slate-600 mb-6">Add items you need</p>

            {/* Add Item Form */}
            <ShoppingListForm onAddItem={addItem} />

            {/* Display Items */}
            {items.length > 0 && (
              <div className="mt-8">
                <ShoppingListDisplay items={items} onDeleteItem={deleteItem} />
              </div>
            )}

            {items.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <p>
                  No items added yet. Add items using the form above or chat
                  with AI assistant.
                </p>
              </div>
            )}
          </div>

          {/* AI Chatbot Button */}
          <div className="border-t pt-6 mb-6">
            <Button
              onClick={() => setChatbotOpen(true)}
              variant="outline"
              className="w-full h-12 border-2 border-slate-300 hover:border-slate-400 text-slate-700"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Open AI Assistant
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold"
          >
            <Check className="w-5 h-5 mr-2" />
            Submit Shopping List
          </Button>
        </Card>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg p-4 py-10 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-900 mb-8 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: 1,
                title: "Add items to your shopping list",
                description: "Start by adding basic items and quantities",
              },
              {
                step: 2,
                title: "Chat with AI to specify preferences",
                description: "Refine details with our AI assistant",
              },
              {
                step: 3,
                title: "Submit and we'll handle the rest",
                description: "Complete your shopping with confidence",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-blue-600">
                      {item.step}
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal
        open={chatbotOpen}
        onOpenChange={setChatbotOpen}
        onAddItem={addItem}
      />
    </div>
  );
}
