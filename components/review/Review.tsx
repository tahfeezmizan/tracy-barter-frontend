"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  Star,
  MessageSquare,
} from "lucide-react";
const Review = () => {
      const params = useParams();
  const orderId = params?.orderId;
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  console.log(orderId);


  const handleClearForm = () => {
    setRating(0);
    setReviewText("");
    setPhotos([]);
    setName("");
    setEmail("");
  };

  const handleSubmitReview = () => {
    console.log({
      orderId,
      rating,
      reviewText,
      photos,
      name,
      email
    });
    // Submit logic here
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

        {/* Review Text */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Review
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
            disabled={rating === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              rating === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#F4C542] text-white hover:bg-[#F4C542]/90"
            }`}
          >
            Submit Review
          </button>
        </div>
      </div>

    </div>
  )
}

export default Review