"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  ClipboardList,
} from "lucide-react";

const INITIAL_DATA = {
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, New York, NY 10001",
  website: "www.qualityhomeservices.com",
  businessName: "Quality Home Services",
  licenseNumber: "HS-2024-001234",
  bio: "Professional service provider with 5+ years of experience in home services.",
};

export default function ContactBusinessInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(INITIAL_DATA);
  const [originalData, setOriginalData] = useState(INITIAL_DATA);

  const handleEdit = () => {
    setOriginalData(data);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setData(originalData);
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Saved Contact & Business Info:", data);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border p-6 space-y-10">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            icon={<Mail className="w-5 h-5 text-gray-700" />}
            label="Email"
            name="email"
            value={data.email}
            disabled
            isEditing={isEditing}
            onChange={handleChange}
          />
          <Field
            icon={<Phone className="w-5 h-5 text-gray-700" />}
            label="Phone"
            name="phone"
            value={data.phone}
            isEditing={isEditing}
            onChange={handleChange}
          />
          <Field
            icon={<MapPin className="w-5 h-5 text-gray-700" />}
            label="Address"
            name="address"
            value={data.address}
            isEditing={isEditing}
            onChange={handleChange}
          />
          <Field
            icon={<Globe className="w-5 h-5 text-gray-700" />}
            label="Website"
            name="website"
            value={data.website}
            isEditing={isEditing}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Business Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Business Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            icon={<Briefcase className="w-5 h-5 text-gray-700" />}
            label="Business Name"
            name="businessName"
            value={data.businessName}
            isEditing={isEditing}
            onChange={handleChange}
          />
          <Field
            icon={<ClipboardList className="w-5 h-5 text-gray-700" />}
            label="License Number"
            name="licenseNumber"
            value={data.licenseNumber}
            isEditing={isEditing}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Professional Bio
        </h3>

        {isEditing ? (
          <textarea
            name="bio"
            value={data.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border rounded-lg bg-gray-50"
          />
        ) : (
          <div className="bg-gray-50 border rounded-lg px-4 py-4 text-gray-800">
            {data.bio}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
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

/* ---------- Field (View + Edit) ---------- */
function Field({
  icon,
  label,
  name,
  value,
  isEditing,
  onChange,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 bg-gray-50 border rounded-lg px-4 py-4">
      <div className="mt-1">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{label}</p>

        {isEditing && !disabled ? (
          <input
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md bg-white"
          />
        ) : (
          <p className="text-gray-900 font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}
