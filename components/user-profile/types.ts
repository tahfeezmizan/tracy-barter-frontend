/**
 * Type definitions for Profile-related components
 */

/** Personal profile data structure */
export interface ProfileData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Business
  businessName: string;
  website: string;
  licenseNumber: string;

  // Profile
  bio: string;
  profileImage: string;
}

/** Props for UserProfile component */
export interface UserProfileProps {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  profileData?: ProfileData;
}

/** Props for EditProfilePage component */
export interface EditProfilePageProps {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onSave?: (data: ProfileData) => void;
}

/** Password change form data */
export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/** File input change event type */
export type FileInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

/** Form input change event type */
export type FormInputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

/** Form submit event type */
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
