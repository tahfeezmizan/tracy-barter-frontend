import MyOrder from "@/components/user-profile/my-order";

/**
 * My Orders Page
 * Displays user's order history with filtering capabilities
 *
 * @component
 */
export default function Page() {
  return (
    <div className="flex items-center overflow-hidden max-w-7xl pt-24 lg:pt-18 mx-auto">
      <MyOrder />
    </div>
  );
}
