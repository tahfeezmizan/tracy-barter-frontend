"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface PriceEditModalProps {
  open: boolean;
  onClose: () => void;
  currentPrice: number;
  bookingId: string;
  onSave?: (bookingId: string, newPrice: number) => void;
}

export function PriceEditModal({
  open,
  onClose,
  currentPrice,
  bookingId,
  onSave,
}: PriceEditModalProps) {
  const [price, setPrice] = useState(currentPrice.toString());

  useEffect(() => {
    setPrice(currentPrice.toString());
  }, [currentPrice, open]);

  const handleSave = () => {
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice) && numPrice >= 0) {
      onSave?.(bookingId, numPrice);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Add Price
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm text-gray-700">
              Enter Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="price"
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="0.00"
                className="pl-7 text-gray-900 placeholder:text-gray-400"
                autoFocus
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 text-white"
            >
              Save Price
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}