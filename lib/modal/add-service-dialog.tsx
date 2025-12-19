"use client";

import { useForm } from "react-hook-form";
import { UploadCloud } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type AddServiceForm = {
  name: string;
  description: string;
  whatWeDo: string;
  whenToBook: string;
  image?: FileList;
};

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddServiceDialog({
  open,
  onOpenChange,
}: AddServiceDialogProps) {
  const { register, handleSubmit, reset } = useForm<AddServiceForm>();

  const onSubmit = (data: AddServiceForm) => {
    console.log("Service Data:", data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Create a new service offering for your clients
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Service Name */}
          <div className="space-y-1">
            <Label>Service Name</Label>
            <Input
              placeholder="e.g., Deep Cleaning"
              {...register("name", { required: true })}
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              rows={3}
              placeholder="Describe the service..."
              {...register("description")}
            />
          </div>

          {/* What we do */}
          <div className="space-y-1">
            <Label>What we do</Label>
            <Input placeholder="eg" {...register("whatWeDo")} />
          </div>

          {/* When to book */}
          <div className="space-y-1">
            <Label>When to book</Label>
            <Input placeholder="eg" {...register("whenToBook")} />
          </div>

          {/* Upload Image */}
          <div className="space-y-2 pt-2">
            <Label className="text-center block">Upload Image</Label>

            <label className="flex flex-col items-center justify-center gap-2 border border-dashed rounded-md py-8 cursor-pointer hover:bg-muted transition">
              <UploadCloud className="size-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
              />
            </label>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full mt-4">
            Add Service
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
