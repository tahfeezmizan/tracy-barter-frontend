// "use client";

// import { memo, useCallback, useState, ChangeEvent, FormEvent } from "react";
// import { KeyRound, Loader2 } from "lucide-react";
// import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
// import { toast } from "sonner";

// interface PasswordFormData {
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// type FormInputChangeEvent = ChangeEvent<HTMLInputElement>;
// type FormSubmitEvent = FormEvent<HTMLFormElement>;

// /** Default password form state */
// const DEFAULT_FORM_STATE: PasswordFormData = {
//   currentPassword: "",
//   newPassword: "",
//   confirmPassword: "",
// };

// /**
//  * ChangePassword Component
//  * Provides a secure form for users to update their password
//  * Includes validation for password confirmation
//  *
//  * @component
//  */
// function ChangePassword() {
//   const [formData, setFormData] =
//     useState<PasswordFormData>(DEFAULT_FORM_STATE);

//   const [changePassword, { isLoading }] = useChangePasswordMutation();

//   const handleInputChange = useCallback((e: FormInputChangeEvent) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }, []);

//   const handleSubmit = useCallback(
//     async (e: FormSubmitEvent) => {
//       e.preventDefault();

//       // Validate passwords match
//       if (formData.newPassword !== formData.confirmPassword) {
//         toast.error("Passwords do not match");
//         return;
//       }

//       try {
//         const res = await changePassword(formData).unwrap();
//         if (res.success) {
//           toast.success(res.message || "Password changed successfully");
//           setFormData(DEFAULT_FORM_STATE);
//         } else {
//           toast.error(res.message || "Failed to change password");
//         }
//       } catch (error: any) {
//         toast.error(error?.data?.message || "Something went wrong");
//         console.error("Change password error:", error);
//       }
//     },
//     [formData, changePassword],
//   );

//   return (
//     <section className="bg-white rounded-xl shadow-sm border p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-3 mb-2">
//           <KeyRound className="w-8 h-8 text-blue-600" aria-hidden="true" />
//           <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
//         </div>
//         <p className="text-gray-600">
//           Update your password to keep your account secure
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//         {/* Current Password */}
//         <div className="space-y-2">
//           <label
//             htmlFor="currentPassword"
//             className="text-sm font-semibold text-gray-700"
//           >
//             Current Password
//           </label>
//           <input
//             id="currentPassword"
//             type="password"
//             name="currentPassword"
//             value={formData.currentPassword}
//             onChange={handleInputChange}
//             placeholder="Enter your current password"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//             required
//             aria-required="true"
//           />
//         </div>

//         {/* New Password */}
//         <div className="space-y-2">
//           <label
//             htmlFor="newPassword"
//             className="text-sm font-semibold text-gray-700"
//           >
//             New Password
//           </label>
//           <input
//             id="newPassword"
//             type="password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleInputChange}
//             placeholder="Enter your new password"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//             required
//             aria-required="true"
//           />
//         </div>

//         {/* Confirm New Password */}
//         <div className="space-y-2">
//           <label
//             htmlFor="confirmPassword"
//             className="text-sm font-semibold text-gray-700"
//           >
//             Confirm New Password
//           </label>
//           <input
//             id="confirmPassword"
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             placeholder="Confirm your new password"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//             required
//             aria-required="true"
//           />
//         </div>

//         {/* Separator */}
//         <div className="h-px bg-gray-300 my-8"></div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-3 bg-[#F4C542] text-white font-medium rounded-lg hover:bg-[#F4C542]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           aria-label="Update password"
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="h-4 w-4 animate-spin" />
//               Updating...
//             </>
//           ) : (
//             "Update Password"
//           )}
//         </button>
//       </form>
//     </section>
//   );
// }

// export default memo(ChangePassword);



"use client";

import { memo, useCallback, useState, ChangeEvent, FormEvent } from "react";
import { KeyRound, Loader2, Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

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
 */
function ChangePassword() {
  const [formData, setFormData] =
    useState<PasswordFormData>(DEFAULT_FORM_STATE);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleInputChange = useCallback((e: FormInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const togglePassword = useCallback(
    (key: "current" | "new" | "confirm") => {
      setShowPasswords((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormSubmitEvent) => {
      e.preventDefault();

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const res = await changePassword(formData).unwrap();
        if (res.success) {
          toast.success(res.message || "Password changed successfully");
          setFormData(DEFAULT_FORM_STATE);
        } else {
          toast.error(res.message || "Failed to change password");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
        console.error("Change password error:", error);
      }
    },
    [formData, changePassword],
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

          <div className="relative">
            <input
              id="currentPassword"
              type={showPasswords.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter your current password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
              aria-required="true"
            />

            <button
              type="button"
              onClick={() => togglePassword("current")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPasswords.current ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="text-sm font-semibold text-gray-700"
          >
            New Password
          </label>

          <div className="relative">
            <input
              id="newPassword"
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
              aria-required="true"
            />

            <button
              type="button"
              onClick={() => togglePassword("new")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPasswords.new ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-gray-700"
          >
            Confirm New Password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
              aria-required="true"
            />

            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPasswords.confirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-300 my-8"></div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#F4C542] text-white font-medium rounded-lg hover:bg-[#F4C542]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          aria-label="Update password"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </section>
  );
}

export default memo(ChangePassword);
