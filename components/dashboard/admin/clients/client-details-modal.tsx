"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ClientDetailsModalProps {
  open: boolean;
  onClose: () => void;
  mode: "view" | "edit";
  client: any;
}

export default function ClientDetailsModal({
  open,
  onClose,
  mode,
  client,
}: ClientDetailsModalProps) {
  const isView = mode === "view";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
          <DialogDescription>
            View and edit client information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="">
            <Label className="pb-2">Name</Label>
          <Input
            defaultValue={client?.name}
            readOnly={isView}
            placeholder="Name"
          />
          </div>
<div className="">
<Label className="pb-2">Email</Label>
          <Input
            defaultValue={client?.email}
            readOnly={isView}
            placeholder="Email"
            />
            </div>

<div className="">
<Label className="pb-2">Phone</Label>
          <Input
            defaultValue={client?.phone}
            readOnly={isView}
            placeholder="Phone"
            />
            </div>

          <div className="flex justify-between text-sm pt-2">
            <div>
              <p className="text-black font-semibold">Total Services</p>
              <p className="font-medium">
                {client?.services?.length || 0}
              </p>
            </div>

            <div>
              <p className="text-black font-semibold">Total Spent</p>
              <p className="font-medium">
                ${client?.totalSpent || 0}
              </p>
            </div>
          </div>

          {!isView && (
            <Button className="w-full mt-4">
              Save Changes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
