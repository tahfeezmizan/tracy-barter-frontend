"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

interface ShoppingListFormProps {
  onAddItem: (name: string, quantity: number) => void;
}

export function ShoppingListForm({ onAddItem }: ShoppingListFormProps) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddItem = () => {
    if (itemName.trim() && quantity > 0) {
      onAddItem(itemName, quantity);
      setItemName("");
      setQuantity(1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="h-10 border-slate-300"
        />
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-md px-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-1 hover:bg-slate-100 rounded"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4 text-slate-600" />
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))
          }
          className="w-12 text-center font-semibold border-none outline-none"
        />
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="p-1 hover:bg-slate-100 rounded"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <Button
        onClick={handleAddItem}
        className="h-10 bg-slate-900 hover:bg-slate-800 text-white font-semibold"
      >
        Add
      </Button>
    </div>
  );
}
