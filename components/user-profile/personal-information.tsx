"use client";

import { useState } from "react";

const INITIAL_DATA = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  streetAddress: "123 Main Street, New York, NY 10001",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  bio: "Professional service provider with 5+ years of experience in home services.",
};

export default function PersonalInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [originalData, setOriginalData] = useState(INITIAL_DATA);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Saved Personal Information:", formData);
    setIsEditing(false);
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Personal Information
      </h3>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <InputField
          label="Email Address"
          name="email"
          value={formData.email}
          disabled
        />
        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      {/* Address */}
      <div className="mt-6 space-y-6">
        <InputField
          label="Street Address"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Bio */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          disabled={!isEditing}
          rows={3}
          className="w-full px-4 py-3 border rounded-lg bg-gray-50 disabled:bg-gray-50"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-8">
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- Reusable Input ---------- */
function InputField({
  label,
  name,
  value,
  onChange,
  disabled,
}: {
  label: string;
  name: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-3 border rounded-lg bg-gray-50 disabled:bg-gray-50"
      />
    </div>
  );
}
