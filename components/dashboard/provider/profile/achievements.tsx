import { Medal, Star, Calendar } from "lucide-react";

export function Achievements() {
  return (
    <div className="w-full p-6 bg-white text-black rounded-xl">
      {/* Heading */}
      <h2 className="text-lg font-semibold">Achievements & Badges</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Your earned achievements
      </p>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="flex flex-col items-center border rounded-xl p-6 bg-gray-50">
          <div className="bg-yellow-400 h-14 w-14 rounded-full flex items-center justify-center mb-3">
            <Medal className="text-gray-800 h-7 w-7" />
          </div>
          <p className="font-medium text-center">100 Services Milestone</p>
          <p className="text-xs text-muted-foreground text-center">
            Achieved Oct 2025
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center border rounded-xl p-6 bg-gray-50">
          <div className="bg-yellow-400 h-14 w-14 rounded-full flex items-center justify-center mb-3">
            <Star className="text-gray-800 h-7 w-7" />
          </div>
          <p className="font-medium text-center">5-Star Rating</p>
          <p className="text-xs text-muted-foreground text-center">
            Current Rating
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center border rounded-xl p-6 bg-gray-50">
          <div className="bg-yellow-400 h-14 w-14 rounded-full flex items-center justify-center mb-3">
            <Calendar className="text-gray-800 h-7 w-7" />
          </div>
          <p className="font-medium text-center">Perfect Attendance</p>
          <p className="text-xs text-muted-foreground text-center">
            This Month
          </p>
        </div>
      </div>
    </div>
  );
}
