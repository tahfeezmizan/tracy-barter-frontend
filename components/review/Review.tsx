"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  Star,
  MessageSquare,
  Loader,
} from "lucide-react";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApis";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Review = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.orderId; 
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const [createReview, { isLoading }] = useCreateReviewMutation();

  // console.log("Order ID for review:", orderId);

  const handleClearForm = () => {
    setRating(0);
    setReviewText("");
    setTitle("");
    setPhotos([]);
  };

  const handleSubmitReview = async () => {
    const payload = {
      bookingId: orderId,
      title: title || "Service Review",
      rating,
      review: reviewText,
    };

    try {
      const res = await createReview(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Review submitted successfully");
        handleClearForm();
        router.push("/user-profile/my-order");
      } else {
        toast.error(res?.message || "Failed to submit review");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
      console.error("Review submission error:", error);
    }
  };
  return (
     <div className="w-full p-4 items-center justify-between rounded-xl gap-4 py-10">
        {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Submit a Review</h1>
        </div>
        <p className="text-gray-600">
          Share your experience with the service
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        {/* Overall Rating Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Overall Rating <span className="text-red-500">*</span>
          </h2>
          
          <div className="flex items-center gap-4 mb-4">
            {/* Star Rating */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            
            {/* Rating Text */}
            <span className="text-lg font-medium text-gray-700">
              {(hoverRating || rating) > 0 ? `${hoverRating || rating}.0` : "0.0"}
            </span>
          </div>
          
          <p className="text-sm text-gray-500">
            Please select a rating
          </p>
        </div>

        {/* Review Title */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Review Title
          </h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Review Text */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Review <span className="text-red-500">*</span>
          </h3>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tell us about your experience with the service. What did you like? What could be improved?"
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>



        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <button
            onClick={handleClearForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Clear Form
          </button>
          <button
            onClick={handleSubmitReview}
            disabled={rating === 0 || isLoading}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              rating === 0 || isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#F4C542] text-white hover:bg-[#F4C542]/90"
            }`}
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : null}
            Submit Review
          </button>
        </div>
      </div>

    </div>
  )
}

export default Review