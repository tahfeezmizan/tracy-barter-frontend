"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PricingPlanType } from "@/config/Types/types";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  useCreateSubscriptionMutation,
  useGetPricingPlansQuery,
  useUpdatePricingPlanMutation,
} from "@/redux/features/pricing/pricingApis";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function PricingPlan() {
  const pathname = usePathname();
  const router = useRouter();

const isPricingPage = pathname === "/dashboard/pricing-plans";


  // Fetch pricing plans
  const { data, isLoading } = useGetPricingPlansQuery(undefined);

  
  const [createSubscription, {isLoading:isCreatingSubscription}] = useCreateSubscriptionMutation();

  const handleSubscription = async (planId: string) => {
    try {
      const res = await createSubscription(planId).unwrap();
      console.log("createSubscription", res);

      if (res.success) {
        toast.success(res.message);
        router.push(res?.data);
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div
  className={`bg-white px-4 sm:px-6 lg:px-8  ${
    isPricingPage ? "py-10 rounded-2xl" : "py-32 faq-gradient-bg"
  }`}
>
  <div className={clsx(
      !isPricingPage && "max-w-7xl mx-auto px-4"
    )}
>

        {pathname !== "/dashboard/pricing-plans" && (
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 md:mb-5">
              Pricing
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Flexible plans that fit your needs—from occasional help to
              full-service care.
            </p>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {data?.map((plan: PricingPlanType) => (
              <Card
                key={plan._id}
                className="border border-primary/70 transition-all duration-300 flex flex-col bg-white rounded-2xl overflow-hidden "
              >
                <CardHeader className="flex flex-col h-full justify-between">
                  <div className="flex flex-col items-center justify-center w-full border-b pb-3">
                    <CardTitle className="text-2xl font-semibold text-black mb-3 p-0">
                      {plan.title}
                    </CardTitle>

                    <div className="flex gap-4 items-center justify-center">
                      <span className="text-3xl font-bold text-neutral-900">
                        {plan.price}
                      </span>
                      <span className="text-neutral-600 text-lg">
                        / {plan.paymentType}
                      </span>
                    </div>
                  </div>

                  <div className="w-full">
                    <CardDescription className="text-lg text-center text-neutral-600 leading-relaxed my-6 p-0 whitespace-pre-line">
                      {plan.description}
                    </CardDescription>
                    <CardDescription className="text-lg text-neutral-600 leading-relaxed text-start my-6 p-0 whitespace-pre-line">
                      {/* {plan.features.join("\n")}
                       */}
                      {plan.features.map((item: string, index: number) => (
                        <div key={index}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </CardDescription>
                  </div>

                  <div className="w-full">
                    {isPricingPage ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border border-primary text-primary hover:bg-primary/40 font-semibold text-2xl py-6 rounded-xl transition-all duration-300 w-full"
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Pricing Plan</DialogTitle>
                          </DialogHeader>
                          <EditPlanForm plan={plan} />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button
                        onClick={() => handleSubscription(plan?._id)}
                        variant="outline"
                        className="border border-primary text-primary hover:bg-primary/40 font-semibold text-2xl py-6 rounded-xl transition-all duration-300 w-full"
                      >
                        {isCreatingSubscription ? (
                          <LoadingSpinner />
                        ) : (
                          "Get started"
                        )}
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
}

function EditPlanForm({ plan }: { plan: PricingPlanType }) {
  const [updatePlan, { isLoading: isUpdating }] =
    useUpdatePricingPlanMutation();
  const [formData, setFormData] = useState({
    title: plan.title,
    description: plan.description,
    features: plan.features.join("\n"),
    price: plan.price,
    session: plan.limits?.session || 0,
    duration: plan.duration,
    paymentType: plan.paymentType,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updatePlan({
        id: plan._id,
        data: {
          ...formData,
          features: formData.features.split("\n").filter((f: string) => f.trim() !== ""),
          limits: {
            session: Number(formData.session),
          },
          price: Number(formData.price),
        },
      }).unwrap();

      if (res.success) {
        toast.success("Plan updated successfully");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update plan");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="h-24"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features (One per line)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          className="h-32"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="session">Limits (Sessions)</Label>
          <Input
            id="session"
            type="number"
            value={formData.session}
            onChange={(e) =>
              setFormData({ ...formData, session: Number(e.target.value) })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentType">Payment Type</Label>
          <Input
            id="paymentType"
            value={formData.paymentType}
            onChange={(e) =>
              setFormData({ ...formData, paymentType: e.target.value })
            }
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isUpdating}>
        {isUpdating ? <LoadingSpinner /> : "Update Plan"}
      </Button>
    </form>
  );
}
