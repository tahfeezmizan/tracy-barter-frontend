import { Star } from "lucide-react";

export function PerformanceStats() {
  return (
    <div className="w-full p-6 bg-white text-black rounded-lg">
      {/* Heading */}
      <h2 className="text-lg font-semibold">Performance Statistics</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Your service performance overview
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Average Rating */}
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md p-6">
          <div className="flex items-center space-x-1">
            <p className="text-3xl font-semibold">4.9</p>
            <Star className="text-yellow-500 fill-yellow-500 h-6 w-6" />
          </div>
          <p className="text-sm text-gray-600 mt-1">Average Rating</p>
        </div>

        {/* Total Services */}
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md p-6">
          <p className="text-3xl font-semibold">156</p>
          <p className="text-sm text-gray-600 mt-1">Total Services</p>
        </div>

        {/* Completion Rate */}
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md p-6">
          <p className="text-3xl font-semibold">98%</p>
          <p className="text-sm text-gray-600 mt-1">Completion Rate</p>
        </div>
      </div>
    </div>
  );
}
