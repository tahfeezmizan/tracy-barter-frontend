"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UploadCloud, Plus, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/features/service/serviceApis";
import { getImageUrl } from "../utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetStaffQuery } from "@/redux/features/service/clientApis";

type SelectedItem = {
  _id: string;
  name: string;
};

type UpdateServiceForm = {
  name: string;
  description: string;
  servicesProvided: string;
  occasions: string;
  image?: FileList;
  serviceTypes: any[];
  dynamicFields: any[];
  staff: string[];
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId: string | null;
}

export function UpdateServiceDialog({ open, onOpenChange, serviceId }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showServiceTypes, setShowServiceTypes] = useState(false);
  const [showDynamicFields, setShowDynamicFields] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);

  const { data: service } = useGetSingleServiceQuery(
    { id: serviceId },
    { skip: !serviceId },
  );

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const { register, handleSubmit, reset, control, setValue, watch } =
    useForm<UpdateServiceForm>({
      defaultValues: {
        serviceTypes: [],
        dynamicFields: [],
        staff: [],
      },
    });

  const {
    fields: serviceTypeFields,
    append: appendServiceType,
    remove: removeServiceType,
  } = useFieldArray({
    control,
    name: "serviceTypes",
  });

  const {
    fields: dynamicFieldFields,
    append: appendDynamicField,
    remove: removeDynamicField,
  } = useFieldArray({
    control,
    name: "dynamicFields",
  });

  // 🔁 Prefill form
  useEffect(() => {
    if (!service) return;

    reset({
      name: service.name,
      description: service.description,
      servicesProvided: service.servicesProvided?.join(", "),
      occasions: service.occasions?.join(", "),
      serviceTypes: service.serviceType || [],
      dynamicFields: service.fields || [],
      staff: service.staff?.map((s: any) => s._id || s) || [],
    });

    setShowServiceTypes(!!service.serviceType?.length);
    setShowDynamicFields(!!service.fields?.length);

    if (service?.image) {
      setImagePreview(service?.image);
    }
  }, [service, reset]);

  const { data: staffData } = useGetStaffQuery({ page: 1, limit: 20 });
  const selectedStaff = watch("staff");

  const toggleStaff = (id: string) => {
    setValue(
      "staff",
      selectedStaff.includes(id)
        ? selectedStaff.filter((v) => v !== id)
        : [...selectedStaff, id],
      { shouldValidate: true },
    );
  };

  const selectedNames = (staffData?.data || [])
    .filter((item: any) => selectedStaff.includes(item._id))
    .map((item: any) => item.name)
    .join(", ");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageRemoved(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setValue("image", undefined);
  };

  const onSubmit = async (data: UpdateServiceForm) => {
    try {
      const formData = new FormData();

      const payload = {
        name: data.name,
        description: data.description,
        servicesProvided: data.servicesProvided.split(",").map((i) => i.trim()),
        occasions: data.occasions.split(",").map((i) => i.trim()),
        serviceType: data.serviceTypes,
        fields: data.dynamicFields,
        staff: data.staff,
        removeImage: imageRemoved, // 👈 IMPORTANT
      };

      formData.append("data", JSON.stringify(payload));

      if (data.image?.[0]) {
        formData.append("images", data.image[0]);
      }

      toast.loading("Updating service...", { id: "update-service" });

      const res = await updateService({
        id: serviceId,
        data: formData,
      }).unwrap();

      toast.success("Service updated successfully", {
        id: "update-service",
      });

      handleClose();
    } catch {
      toast.error("Failed to update service", { id: "update-service" });
    }
  };

  const handleClose = () => {
    reset();
    setImagePreview(null);
    setImageRemoved(false);
    setShowServiceTypes(false);
    setShowDynamicFields(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Service</DialogTitle>
          <DialogDescription>Update your service details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* BASIC INFO */}
          <div className="space-y-4">
            <Label>Service Name *</Label>
            <Input {...register("name")} />

            <Label>Description *</Label>
            <Textarea rows={3} {...register("description")} />

            <Label>Services Provided *</Label>
            <Input {...register("servicesProvided")} />

            <Label>Occasions *</Label>
            <Input {...register("occasions")} />

            <div className="space-y-2">
              <Label>Add Staff *</Label>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start truncate bg-transparent"
                  >
                    {selectedNames || "Select staff"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white">
                  {(staffData?.data || []).map((item: any) => (
                    <DropdownMenuCheckboxItem
                      key={item._id}
                      checked={selectedStaff.includes(item._id)}
                      onCheckedChange={() => toggleStaff(item._id)}
                    >
                      {item.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* SERVICE TYPES */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Service Types</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowServiceTypes(true);
                  appendServiceType({ title: "", description: "" });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add More
              </Button>
            </div>

            {showServiceTypes &&
              serviceTypeFields.map((_, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-slate-200 space-y-3"
                >
                  <div className="flex justify-between">
                    <Label>Service Type {index + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeServiceType(index)}
                    >
                      <X />
                    </Button>
                  </div>

                  <Input
                    placeholder="Title"
                    {...register(`serviceTypes.${index}.title`)}
                  />
                  <Textarea
                    placeholder="Description"
                    rows={2}
                    {...register(`serviceTypes.${index}.description`)}
                  />
                </div>
              ))}
          </div>

          {/* DYNAMIC FIELDS */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Dynamic Fields</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowDynamicFields(true);
                  appendDynamicField({
                    name: "",
                    type: "string",
                    label: "",
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add More
              </Button>
            </div>

            {showDynamicFields &&
              dynamicFieldFields.map((_, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-slate-200 space-y-3"
                >
                  <div className="flex justify-between">
                    <Label>Field {index + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDynamicField(index)}
                    >
                      <X />
                    </Button>
                  </div>

                  <Input
                    placeholder="Field Name"
                    {...register(`dynamicFields.${index}.name`)}
                  />

                  <Select
                    defaultValue={watch(`dynamicFields.${index}.type`)}
                    onValueChange={(value) =>
                      setValue(`dynamicFields.${index}.type`, value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="string">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Field Label"
                    {...register(`dynamicFields.${index}.label`)}
                  />
                </div>
              ))}
          </div>

          {/* IMAGE */}
          <div className="pt-4 border-t">
            {imagePreview ? (
              <div className="relative w-56 h-44">
                {/* Check if it's a base64 string (starts with data:) or a URL */}
                {imagePreview.startsWith("data:") ? (
                  // For base64 images from upload
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover rounded-md w-full h-full"
                  />
                ) : (
                  // For URLs from server
                  <Image
                    src={getImageUrl(imagePreview)}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                    unoptimized={imagePreview?.startsWith("http")} // Optional: disable optimization for external URLs
                  />
                )}

                {/* REMOVE BUTTON */}
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="border-4 border-dashed py-8 flex justify-center cursor-pointer">
                <UploadCloud />
                <input
                  type="file"
                  hidden
                  {...register("image", {
                    onChange: handleImageChange,
                  })}
                  ref={(e) => {
                    fileInputRef.current = e;
                    // @ts-ignore
                    register("image").ref(e);
                  }}
                />
              </label>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Update Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
