import { useCreateSupportTicketMutation } from "@/redux/features/support/supportApi";
import { CloudCog, Flag } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const Report = () => {
   const params = useParams();
  const bookingId = params?.orderId;

      const [problemType, setProblemType] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [createSupportTicket] = useCreateSupportTicketMutation();

  // const problemTypes = [
  //   "Payment Issue",
  //   "Service Quality",
  //   "Safety Concern",
  //   "Professionalism",
  //   "Cancellation",
  //   "Other"
  // ];

const priorityLevels = [
  {
    label: "low",
    active: "border-green-600 bg-green-50 text-green-700 ring-2 ring-green-200",
    inactive: "border-gray-300 text-gray-700 hover:border-green-400"
  },
  {
    label: "medium",
    active: "border-yellow-600 bg-yellow-50 text-yellow-700 ring-2 ring-yellow-200",
    inactive: "border-gray-300 text-gray-700 hover:border-yellow-400"
  },
  {
    label: "high",
    active: "border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-200",
    inactive: "border-gray-300 text-gray-700 hover:border-orange-400"
  }
];

  const handleClearForm = () => {
    setProblemType("");
    setPriorityLevel("");
    setSubject("");
    setDescription("");
  };

  const handleSubmitReport = async () => {
    console.log({
      
      priorityLevel,
      subject,
      description
    });
    
    try {
      const res = await createSupportTicket({
        bookingId:bookingId,
        priority: priorityLevel,
        message: description
      });

      console.log(res)

      if (res.data) {
        toast.success("Report submitted successfully");
        handleClearForm();
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-20 pb-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Flag className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-800">Submit a Report</h1>
        </div>
        <p className="text-gray-600">
          Report any issues or concerns about the service
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl border p-6">
        {/* Problem Type */}
        {/* <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Problem Type <span className="text-red-500">*</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {problemTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setProblemType(type)}
                className={`px-4 py-3 border rounded-lg text-left transition-colors ${
                  problemType === type
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Select problem type
          </p>
        </div> */}

        {/* Priority Level */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Priority Level <span className="text-red-500">*</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {priorityLevels.map((level) => (
              <button
  key={level.label}
  type="button"
  onClick={() => setPriorityLevel(level.label)}
  className={`px-4 py-3 border rounded-lg text-center transition-all duration-200 capitalize font-semibold ${
    priorityLevel === level.label
      ? level.active
      : level.inactive
  }`}
>
  {level.label}
</button>

            ))}
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Select priority level
          </p>
        </div>

        {/* Subject */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Subject <span className="text-red-500">*</span>
          </h2>
          
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary of the problem"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Description <span className="text-red-500">*</span>
          </h2>
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide detailed information about the issue. Include any relevant dates, times, and specific incidents."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
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
            onClick={handleSubmitReport}
            disabled={!priorityLevel || !subject || !description}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              !priorityLevel || !subject || !description
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default Report