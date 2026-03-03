"use client";

import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UploadCloud, Plus, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner"; // or use your preferred toast library

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
import Image from "next/image";
import { useCreateServiceMutation } from "@/redux/features/service/serviceApis";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetStaffQuery } from "@/redux/features/service/clientApis";

type ServiceType = {
  id: string;
  title: string;
  description: string;
};

type DynamicField = {
  id: string;
  name: string;
  type: "string" | "number" | "boolean"; // Match API enum
  label: string;
};

type AddServiceForm = {
  name: string;
  description: string;
  servicesProvided: string;
  occasions: string;
  image?: FileList;
  serviceTypes: ServiceType[];
  dynamicFields: DynamicField[];
  staff: string[];
};

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SelectedItem = {
  _id: string;
  name: string;
};

export function AddServiceDialog({
  open,
  onOpenChange,
}: AddServiceDialogProps) {
  const [showServiceTypes, setShowServiceTypes] = useState(false);
  const [showDynamicFields, setShowDynamicFields] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, control, setValue, watch } =
    useForm<AddServiceForm>({
      defaultValues: {
        serviceTypes: [],
        dynamicFields: [],
        staff: [],
      },
    });

  const imageFile = watch("image");

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

  const { data: staffData } = useGetStaffQuery({ page: 1, limit: 10 });

  console.log(staffData?.data);

  const handleAddServiceType = () => {
    if (!showServiceTypes) {
      setShowServiceTypes(true);
    }
    appendServiceType({
      id: Date.now().toString(),
      title: "",
      description: "",
    });
  };

  const handleAddDynamicField = () => {
    if (!showDynamicFields) {
      setShowDynamicFields(true);
    }
    appendDynamicField({
      id: Date.now().toString(),
      name: "",
      type: "string",
      label: "",
    });
  };

  const handleRemoveServiceType = (index: number) => {
    removeServiceType(index);
    if (serviceTypeFields.length === 1) {
      setShowServiceTypes(false);
    }
  };

  const handleRemoveDynamicField = (index: number) => {
    removeDynamicField(index);
    if (dynamicFieldFields.length === 1) {
      setShowDynamicFields(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("image", undefined);
  };

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

  const [createService, { isLoading }] = useCreateServiceMutation();

  const onSubmit = async (data: AddServiceForm) => {
    console.log("Service Data:", data);

    try {
      // Convert comma-separated strings to arrays
      const servicesProvidedArray = data.servicesProvided
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const occasionsArray = data.occasions
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      // Transform serviceTypes array to match API format (remove id)
      const serviceTypeArray = data.serviceTypes.map(({ id, ...rest }) => rest);

      // Transform dynamicFields array to match API fields format (remove id)
      // No need to map types since we're already using the correct enum values
      const fieldsArray = data.dynamicFields.map(({ id, ...rest }) => rest);

      // Create FormData for file upload
      const formData = new FormData();

      // Create the main data object
      const payload = {
        name: data.name,
        description: data.description,
        servicesProvided: servicesProvidedArray,
        occasions: occasionsArray,
        status: "active",
        serviceType: serviceTypeArray,
        fields: fieldsArray,
        staff: data.staff,
      };

      console.log("Formatted Data for API:", payload);

      // Append the JSON payload
      formData.append("data", JSON.stringify(payload));

      // Append image file if exists
      if (data.image && data.image[0]) {
        formData.append("images", data.image[0]);
      }

      // Show loading toast
      toast.loading("Creating service...", {
        id: "create-service", // Use ID to update the toast
      });

      // Call the mutation
      const res = await createService(formData).unwrap();
      console.log("API Response:", res);

      // Show success toast
      toast.success(res?.message || "Service created successfully!", {
        id: "create-service", // Same ID to replace the loading toast
      });

      // Reset form
      handleClose();
    } catch (error: any) {
      console.error("Error creating service:", error);

      // Show error toast
      if (error?.data?.message) {
        toast.error(error.data.message, {
          id: "create-service",
        });

        // Show individual error messages if available
        if (error.data.errorMessages) {
          error.data.errorMessages.forEach((errMsg: any, index: number) => {
            setTimeout(() => {
              toast.error(`${errMsg.path}: ${errMsg.message}`, {
                id: `error-${index}`,
              });
            }, index * 100); // Stagger error messages
          });
        }
      } else {
        toast.error("Failed to create service. Please try again.", {
          id: "create-service",
        });
      }
    }
  };

  const handleClose = () => {
    reset();
    setImagePreview(null);
    setShowServiceTypes(false);
    setShowDynamicFields(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Create a new service offering for your clients
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            {/* Service Name */}
            <div className="space-y-2">
              <Label>Service Name *</Label>
              <Input
                className="border-none bg-gray-200/80 text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none"
                placeholder="e.g., Deep Cleaning"
                {...register("name", { required: true })}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                rows={3}
                className="border-none bg-gray-200/80 text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none"
                placeholder="Describe the service..."
                // {...register("description", { required: true })}
              />
            </div>

            {/* What we do */}
            <div className="space-y-2">
              <Label>Services Provided (comma-separated) *</Label>
              <Input
                className="border-none bg-gray-200/80 text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none"
                placeholder="e.g., Comprehensive cleaning of all areas"
                // {...register("servicesProvided", { required: true })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter multiple services separated by commas
              </p>
            </div>

            {/* Occasions */}
            <div className="space-y-2">
              <Label>Occasions (comma-separated) *</Label>
              <Input
                className="border-none bg-gray-200/80 text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none"
                placeholder="e.g., Wedding, Birthday, Corporate Event"
                // {...register("occasions", { required: true })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter multiple occasions separated by commas
              </p>
            </div>

            <div className="space-y-2">
              <Label>Add Staff *</Label>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start truncate"
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

          {/* Service Types Section */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Service Types</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddServiceType}
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4" />
                Add More
              </Button>
            </div>

            {showServiceTypes && (
              <div className="space-y-4">
                {serviceTypeFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-3 p-4 border rounded-lg bg-slate-200"
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">
                        Service Type {index + 1}
                      </Label>
                      {serviceTypeFields.length > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveServiceType(index)}
                          className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                          disabled={isLoading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label className="2ext-sm">Title</Label>
                        <Input
                          className="border-none bg-white text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none"
                          placeholder="e.g., Starter Package"
                          // {...register(`serviceTypes.${index}.title` as const)}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm">Description</Label>
                        <Textarea
                          rows={2}
                          className="border-none bg-white text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none"
                          placeholder="Describe this service type..."
                          // {...register(
                          //   `serviceTypes.${index}.description` as const,
                          // )}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Fields Section */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Dynamic Fields</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddDynamicField}
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4" />
                Add More
              </Button>
            </div>

            {showDynamicFields && (
              <div className="space-y-4">
                {dynamicFieldFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-3 p-4 border rounded-lg bg-slate-200"
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">
                        Field {index + 1}
                      </Label>
                      {dynamicFieldFields.length > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDynamicField(index)}
                          className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                          disabled={isLoading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="">Field Name</Label>
                        <Input
                          className="border-none bg-white text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none"
                          placeholder="e.g., duration"
                          // {...register(`dynamicFields.${index}.name` as const)}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="">Type</Label>
                        <Select
                          onValueChange={(value: string) => {
                            setValue(
                              `dynamicFields.${index}.type` as const,
                              value as "string" | "number" | "boolean",
                            );
                          }}
                          defaultValue={field.type}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-full border-none bg-white text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="string">Text/String</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="boolean">
                              Checkbox/Boolean
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <Label className="2ext-sm">Field Label</Label>
                        <Input
                          className="border-none bg-white text-black text-lg py-3 focus:ring-2 focus:ring-primary/75 focus:outline-none"
                          placeholder="e.g., Duration in hours"
                          // {...register(`dynamicFields.${index}.label` as const)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload Image */}
          <div className="space-y-2 pt-4 border-t">
            <Label className="text-center block">Upload Image</Label>
            {imagePreview ? (
              <div className="relative border-4 border-dashed border-slate-200 rounded-md py-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="relative w-56 h-44 overflow-hidden rounded-md">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    {/* Cross button on top right of the image */}
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 border-4 border-dashed border-slate-200 rounded-md py-8 cursor-pointer hover:bg-muted transition disabled:opacity-50">
                <UploadCloud className="size-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                  onChange={(e) => {
                    register("image").onChange(e);
                    handleImageChange(e);
                  }}
                  disabled={isLoading}
                />
              </label>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Add Service"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
