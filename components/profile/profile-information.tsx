import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Building, 
  FileText, 
  Briefcase,
  User,
  MapPinHouse
} from "lucide-react";

export default function ProfileInfo() {
  const profileData = {
    // Personal Information
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    
    // Address Details
    streetAddress: "123 Main Street, New York, NY 10001",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    
    // Business Information
    website: "www.qualityhomeservices.com",
    businessName: "Quality Home Services",
    licenseNumber: "HS-2024-001234",
    bio: "Professional service provider with 5+ years of experience in home services."
  };

  return (
    <div className="w-full  mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Profile Information
      </h2>
      
      <div className="space-y-8">
        {/* Personal Information Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-700">
              Personal Information
            </h3>
          </div>

          <div className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">First Name</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-800">{profileData.firstName}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">Last Name</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-800">{profileData.lastName}</span>
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">Email Address</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <a 
                    href={`mailto:${profileData.email}`}
                    className="text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">Phone Number</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <a 
                    href={`tel:${profileData.phone.replace(/[^+\d]/g, '')}`}
                    className="text-gray-800 hover:text-green-600 transition-colors"
                  >
                    {profileData.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200"></div>

        {/* Address Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-700">
              Address
            </h3>
          </div>

          <div className="space-y-6">
            {/* Street Address */}
            <div className="space-y-2">
              <label className="text-sm text-gray-500 font-medium">Street Address</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPin className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-gray-800">{profileData.streetAddress}</span>
              </div>
            </div>

            {/* City, State, ZIP Code */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">City</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPinHouse className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-800">{profileData.city}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">State</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPinHouse className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-800">{profileData.state}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">ZIP Code</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPinHouse className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-800 font-mono">{profileData.zipCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200"></div>

        {/* Business Information Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-700">
              Business Information
            </h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Website */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">Website</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Globe className="w-4 h-4 text-purple-600" />
                  </div>
                  <a 
                    href={`https://${profileData.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-purple-600 transition-colors"
                  >
                    {profileData.website}
                  </a>
                </div>
              </div>

              {/* Business Name */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-medium">Business Name</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Building className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-800 font-medium">{profileData.businessName}</span>
                </div>
              </div>
            </div>

            {/* License Number */}
            <div className="space-y-2">
              <label className="text-sm text-gray-500 font-medium">License Number</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg max-w-md">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-gray-800 font-mono">{profileData.licenseNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200"></div>

        {/* Professional Bio Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-700">
              Professional Bio
            </h3>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed mb-3">{profileData.bio}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  5+ years experience
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                  Home Services
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                  Licensed Professional
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}