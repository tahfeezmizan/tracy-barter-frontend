'use client';
import { KeyRound } from "lucide-react";
import { useState } from "react";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating password:", formData);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <KeyRound className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Change Password</h1>
        </div>
        <p className="text-gray-600">
          Update your password to keep your account secure
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">Current Password</h3>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholder="Enter your current password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">New Password</h3>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter your new password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">Confirm New Password</h3>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your new password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-300 my-8"></div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#F4C542] text-white font-medium rounded-lg hover:bg-[#F4C542]/90 transition-colors"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}