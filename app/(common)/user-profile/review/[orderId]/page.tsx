import Review from "@/components/review/Review";

/**
 * Review Page
 * Allows users to submit reviews for completed orders
 *
 * @component
 */
export default function Page() {
  return (
    <div className="overflow-hidden max-w-7xl pt-24 lg:pt-16 mx-auto">
      <Review />
    </div>
  );
}