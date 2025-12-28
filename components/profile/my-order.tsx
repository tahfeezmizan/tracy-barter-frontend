import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function MyOrder() {
  const orders = [
    {
      id: 1,
      service: "Deep Cleaning Service",
      status: "Pending",
      customer: "Sarah Johnson",
      date: "2024-12-10 at 10:00 AM",
      address: "123 Main St, New York, NY",
      price: "$150",
      progress: 25,
      statusIcon: Clock,
      statusColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: 2,
      service: "Electrical Work",
      status: "Completed",
      customer: "Emily Rodriguez",
      date: "2024-12-07 at 11:30 AM",
      address: "789 Pine Rd, New York, NY",
      price: "$180",
      progress: 100,
      statusIcon: CheckCircle,
      statusColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      service: "Window Cleaning",
      status: "Cancelled",
      customer: "Lisa Anderson",
      date: "2024-12-04 at 3:00 PM",
      address: "654 Maple Dr, New York, NY",
      price: "$100",
      progress: 0,
      statusIcon: XCircle,
      statusColor: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className=" mx-auto p-6 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">All Orders</h1>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
            All Orders
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
            Pending
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
            Completed
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {order.service}
                </h3>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full ${order.bgColor} flex items-center gap-1.5`}>
                    <order.statusIcon className={`w-4 h-4 ${order.statusColor}`} />
                    <span className={`font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                    {order.status === "Pending" && (
                      <span className="text-gray-600 ml-1">:</span>
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {order.customer}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {order.price}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Date & Time</div>
                <div className="font-medium text-gray-700">{order.date}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-medium text-gray-700">{order.address}</div>
              </div>
            </div>

            {/* Progress Bar or Actions */}
            {order.status === "Pending" && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-gray-800">{order.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {order.status === "Completed" && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-gray-800">{order.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              {order.status === "Completed" && (
                <>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Review
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                    Report
                  </button>
                </>
              )}
              
              {order.status === "Pending" && (
                // <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                //   Update Progress
                // </button>
                <></>
              )}
              
              {order.status === "Cancelled" && (
                <>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Review
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                    Report
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}