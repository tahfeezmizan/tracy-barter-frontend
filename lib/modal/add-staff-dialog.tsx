"use client";

import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateStaffMutation,
  useGetStaffSpecialtyServicesQuery,
} from "@/redux/features/service/staffApis";
import { toast } from "sonner";

type SelectedItem = {
  _id: string;
  name: string;
};

type StaffFormValues = {
  fullName: string;
  email: string;
  phone: string;
  specialty: string[];
  bio?: string;
};

export function AddStaffDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<StaffFormValues>({
      defaultValues: {
        specialty: [],
      },
    });

  const { data = [] } = useGetStaffSpecialtyServicesQuery(undefined);
  const selectedSpecialties = watch("specialty");

  const [AddStaff] = useCreateStaffMutation({});

  // console.log(data);

  const toggleSpecialty = (id: string) => {
    setValue(
      "specialty",
      selectedSpecialties.includes(id)
        ? selectedSpecialties.filter((v) => v !== id)
        : [...selectedSpecialties, id],
      { shouldValidate: true }
    );
  };



  const onSubmit = async (data: StaffFormValues) => {
    console.log(data);

    try {
      const res = await AddStaff({
        name: data?.fullName,
        email: data?.email,
        services: data?.specialty,
        bio: data?.bio,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      console.log("Api Res", res?.data);
    } catch (error) {
      console.log(error);
    }

    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogDescription>
            Add a new service provider to your team
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                {...register("fullName", { required: true })}
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                {...register("email", { required: true })}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Phone *</Label>
              <Input
                {...register("phone", { required: true })}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label>Specialty *</Label>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    Select specialty
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white min-w-[200px] flex flex-col">
                  {data.map((item: SelectedItem) => (
                    <DropdownMenuCheckboxItem
                      key={item._id}
                      checked={selectedSpecialties.includes(item._id)}
                      onCheckedChange={() => toggleSpecialty(item._id)}
                    >
                      {item.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Selected Specialties List */}
              <div className="flex flex-col gap-2 mt-2">
                {data
                  .filter((item: SelectedItem) =>
                    selectedSpecialties.includes(item._id)
                  )
                  .map((item: SelectedItem) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between bg-slate-100 px-3 py-2 rounded-md text-sm"
                    >
                      <span>{item.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleSpecialty(item._id)}
                        className="text-red-500 hover:text-red-700 font-bold ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              {...register("bio")}
              placeholder="Enter staff member bio and expertise..."
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="flex items-center gap-2">
              <UserPlus className="size-4" />
              Add Staff Member
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
