"use client";

import type { ShoppingItem } from "./shopping-list-page";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ShoppingListDisplayProps {
  items: ShoppingItem[];
  onDeleteItem: (id: string) => void;
}

export function ShoppingListDisplay({
  items,
  onDeleteItem,
}: ShoppingListDisplayProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-200"
        >
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 capitalize">
              {item.name}
            </h4>
            <p className="text-sm text-slate-600">
              Quantity: {item.quantity}
              {item.source === "chatbot" && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  AI Added
                </span>
              )}
            </p>
          </div>
          <Button
            onClick={() => onDeleteItem(item.id)}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      ))}
    </div>
  );
}
