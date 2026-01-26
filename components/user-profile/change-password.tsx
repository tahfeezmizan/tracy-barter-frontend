"use client";

import { memo, useCallback, useState, ChangeEvent, FormEvent } from "react";
import { KeyRound } from "lucide-react";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type FormInputChangeEvent = ChangeEvent<HTMLInputElement>;
type FormSubmitEvent = FormEvent<HTMLFormElement>;

/** Default password form state */
const DEFAULT_FORM_STATE: PasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

/**
 * ChangePassword Component
 * Provides a secure form for users to update their password
 * Includes validation for password confirmation
 *
 * @component
 */
function ChangePassword() {
  const [formData, setFormData] =
    useState<PasswordFormData>(DEFAULT_FORM_STATE);

  const handleInputChange = useCallback((e: FormInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormSubmitEvent) => {
      e.preventDefault();

      // Validate passwords match
      if (formData.newPassword !== formData.confirmPassword) {
        console.error("Passwords do not match");
        return;
      }

      console.log("Updating password:", formData);
      // Reset form on successful submission
      setFormData(DEFAULT_FORM_STATE);
    },
    [formData],
  );

  return (
    <section className="bg-white rounded-xl shadow-sm border p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <KeyRound className="w-8 h-8 text-blue-600" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
        </div>
        <p className="text-gray-600">
          Update your password to keep your account secure
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Current Password */}
        <div className="space-y-2">
          <label
            htmlFor="currentPassword"
            className="text-sm font-semibold text-gray-700"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholder="Enter your current password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
            aria-required="true"
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="text-sm font-semibold text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter your new password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
            aria-required="true"
          />
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your new password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
            aria-required="true"
          />
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-300 my-8"></div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#F4C542] text-white font-medium rounded-lg hover:bg-[#F4C542]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Update password"
        >
          Update Password
        </button>
      </form>
    </section>
  );
}

export default memo(ChangePassword);
