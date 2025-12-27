import PersonalInformation from "@/components/dashboard/provider/profile/personal-information";
import ChangePassword from "@/components/profile/change-password";
import ProfileInfo from "@/components/profile/profile-information";
import ContactInfo from "@/components/profile/profile-information";
import UserProfile from "@/components/profile/user-profile";

export default function page() {
  return (
    <div className="flex items-center overflow-hidden max-w-7xl  pt-24 lg:pt-16 mx-auto">
      <div className="w-full pt-10">
        <UserProfile />
        <ProfileInfo />
        <ChangePassword />
      </div>
    </div>
  );
}
