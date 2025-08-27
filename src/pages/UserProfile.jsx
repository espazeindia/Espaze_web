import React, { useState, useEffect, useRef } from "react";
import { useMode } from "../contexts/themeModeContext";
import EyeOpen from "../assets/img/eye-open.svg";
import EyeClosed from "../assets/img/eye-closed.svg";

const countries = [
  { code: "AF", name: "Afghanistan", dialCode: "+93", phoneLength: 9 },
  { code: "AL", name: "Albania", dialCode: "+355", phoneLength: 9 },
  { code: "DZ", name: "Algeria", dialCode: "+213", phoneLength: 9 },
  { code: "AD", name: "Andorra", dialCode: "+376", phoneLength: 6 },
  { code: "AO", name: "Angola", dialCode: "+244", phoneLength: 9 },
  { code: "AG", name: "Antigua and Barbuda", dialCode: "+1268", phoneLength: 10 },
  { code: "AR", name: "Argentina", dialCode: "+54", phoneLength: [6, 7, 8] },
  { code: "AM", name: "Armenia", dialCode: "+374", phoneLength: 6 },
  { code: "AU", name: "Australia", dialCode: "+61", phoneLength: 9 },
  { code: "AT", name: "Austria", dialCode: "+43", phoneLength: [10, 11] },
  { code: "AZ", name: "Azerbaijan", dialCode: "+994", phoneLength: 9 },
  { code: "BH", name: "Bahrain", dialCode: "+973", phoneLength: 8 },
  { code: "BD", name: "Bangladesh", dialCode: "+880", phoneLength: 10 },
  { code: "BY", name: "Belarus", dialCode: "+375", phoneLength: 9 },
  { code: "BE", name: "Belgium", dialCode: "+32", phoneLength: 9 },
  { code: "BJ", name: "Benin", dialCode: "+229", phoneLength: 8 },
  { code: "BT", name: "Bhutan", dialCode: "+975", phoneLength: 7 },
  { code: "BO", name: "Bolivia", dialCode: "+591", phoneLength: 8 },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387", phoneLength: 9 },
  { code: "BR", name: "Brazil", dialCode: "+55", phoneLength: 11 },
  { code: "BG", name: "Bulgaria", dialCode: "+359", phoneLength: 9 },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", phoneLength: 8 },
  { code: "KH", name: "Cambodia", dialCode: "+855", phoneLength: 9 },
  { code: "CM", name: "Cameroon", dialCode: "+237", phoneLength: 9 },
  { code: "CA", name: "Canada", dialCode: "+1", phoneLength: 10 },
  { code: "CL", name: "Chile", dialCode: "+56", phoneLength: 9 },
  { code: "CN", name: "China", dialCode: "+86", phoneLength: 11 },
  { code: "CO", name: "Colombia", dialCode: "+57", phoneLength: 10 },
  { code: "HR", name: "Croatia", dialCode: "+385", phoneLength: 9 },
  { code: "CU", name: "Cuba", dialCode: "+53", phoneLength: 8 },
  { code: "CY", name: "Cyprus", dialCode: "+357", phoneLength: 8 },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", phoneLength: 9 },
  { code: "DK", name: "Denmark", dialCode: "+45", phoneLength: 8 },
  { code: "DJ", name: "Djibouti", dialCode: "+253", phoneLength: 10 },
  { code: "EC", name: "Ecuador", dialCode: "+593", phoneLength: 9 },
  { code: "EG", name: "Egypt", dialCode: "+20", phoneLength: 10 },
  { code: "ER", name: "Eritrea", dialCode: "+291", phoneLength: 7 },
  { code: "EE", name: "Estonia", dialCode: "+372", phoneLength: 8 },
  { code: "FI", name: "Finland", dialCode: "+358", phoneLength: [9, 11] },
  { code: "FR", name: "France", dialCode: "+33", phoneLength: 9 },
  { code: "DE", name: "Germany", dialCode: "+49", phoneLength: [10, 11] },
  { code: "GH", name: "Ghana", dialCode: "+233", phoneLength: 9 },
  { code: "GR", name: "Greece", dialCode: "+30", phoneLength: 10 },
  { code: "GT", name: "Guatemala", dialCode: "+502", phoneLength: 8 },
  { code: "HN", name: "Honduras", dialCode: "+504", phoneLength: 8 },
  { code: "HK", name: "Hong Kong", dialCode: "+852", phoneLength: 8 },
  { code: "HU", name: "Hungary", dialCode: "+36", phoneLength: 9 },
  { code: "IS", name: "Iceland", dialCode: "+354", phoneLength: 7 },
  { code: "IN", name: "India", dialCode: "+91", phoneLength: 10 },
  { code: "ID", name: "Indonesia", dialCode: "+62", phoneLength: [9, 11] },
  { code: "IR", name: "Iran", dialCode: "+98", phoneLength: 10 },
  { code: "IQ", name: "Iraq", dialCode: "+964", phoneLength: 10 },
  { code: "IE", name: "Ireland", dialCode: "+353", phoneLength: 9 },
  { code: "IL", name: "Israel", dialCode: "+972", phoneLength: 9 },
  { code: "IT", name: "Italy", dialCode: "+39", phoneLength: 10 },
  { code: "JM", name: "Jamaica", dialCode: "+1876", phoneLength: 10 },
  { code: "JP", name: "Japan", dialCode: "+81", phoneLength: 10 },
  { code: "JO", name: "Jordan", dialCode: "+962", phoneLength: 9 },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7", phoneLength: 10 },
  { code: "KE", name: "Kenya", dialCode: "+254", phoneLength: 10 },
  { code: "KW", name: "Kuwait", dialCode: "+965", phoneLength: 8 },
  { code: "KG", name: "Kyrgyzstan", dialCode: "+996", phoneLength: 9 },
  { code: "LV", name: "Latvia", dialCode: "+371", phoneLength: 8 },
  { code: "LB", name: "Lebanon", dialCode: "+961", phoneLength: 8 },
  { code: "LS", name: "Lesotho", dialCode: "+266", phoneLength: 8 },
  { code: "LY", name: "Libya", dialCode: "+218", phoneLength: 9 },
  { code: "LT", name: "Lithuania", dialCode: "+370", phoneLength: 8 },
  { code: "LU", name: "Luxembourg", dialCode: "+352", phoneLength: 9 },
  { code: "MY", name: "Malaysia", dialCode: "+60", phoneLength: [7, 8, 9, 10] },
  { code: "MX", name: "Mexico", dialCode: "+52", phoneLength: 10 },
  { code: "MN", name: "Mongolia", dialCode: "+976", phoneLength: 8 },
  { code: "MA", name: "Morocco", dialCode: "+212", phoneLength: 9 },
  { code: "MM", name: "Myanmar", dialCode: "+95", phoneLength: 9 },
  { code: "NP", name: "Nepal", dialCode: "+977", phoneLength: 10 },
  { code: "NL", name: "Netherlands", dialCode: "+31", phoneLength: 9 },
  { code: "NZ", name: "New Zealand", dialCode: "+64", phoneLength: 9 },
  { code: "NG", name: "Nigeria", dialCode: "+234", phoneLength: 10 },
  { code: "NO", name: "Norway", dialCode: "+47", phoneLength: 8 },
  { code: "OM", name: "Oman", dialCode: "+968", phoneLength: 8 },
  { code: "PK", name: "Pakistan", dialCode: "+92", phoneLength: 10 },
  { code: "PS", name: "Palestine", dialCode: "+970", phoneLength: 9 },
  { code: "PA", name: "Panama", dialCode: "+507", phoneLength: 8 },
  { code: "PG", name: "Papua New Guinea", dialCode: "+675", phoneLength: 8 },
  { code: "PE", name: "Peru", dialCode: "+51", phoneLength: 9 },
  { code: "PH", name: "Philippines", dialCode: "+63", phoneLength: 10 },
  { code: "PL", name: "Poland", dialCode: "+48", phoneLength: 9 },
  { code: "PT", name: "Portugal", dialCode: "+351", phoneLength: 9 },
  { code: "PR", name: "Puerto Rico", dialCode: "+1939", phoneLength: 10 },
  { code: "QA", name: "Qatar", dialCode: "+974", phoneLength: 8 },
  { code: "RO", name: "Romania", dialCode: "+40", phoneLength: 9 },
  { code: "RU", name: "Russia", dialCode: "+7", phoneLength: 10 },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", phoneLength: 9 },
  { code: "SN", name: "Senegal", dialCode: "+221", phoneLength: 9 },
  { code: "RS", name: "Serbia", dialCode: "+381", phoneLength: 9 },
  { code: "SG", name: "Singapore", dialCode: "+65", phoneLength: 8 },
  { code: "SK", name: "Slovakia", dialCode: "+421", phoneLength: 9 },
  { code: "SI", name: "Slovenia", dialCode: "+386", phoneLength: 8 },
  { code: "ZA", name: "South Africa", dialCode: "+27", phoneLength: 9 },
  { code: "ES", name: "Spain", dialCode: "+34", phoneLength: 9 },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", phoneLength: 9 },
  { code: "SE", name: "Sweden", dialCode: "+46", phoneLength: 7 },
  { code: "CH", name: "Switzerland", dialCode: "+41", phoneLength: 9 },
  { code: "SY", name: "Syria", dialCode: "+963", phoneLength: 9 },
  { code: "TW", name: "Taiwan", dialCode: "+886", phoneLength: 9 },
  { code: "TJ", name: "Tajikistan", dialCode: "+992", phoneLength: 9 },
  { code: "TH", name: "Thailand", dialCode: "+66", phoneLength: 9 },
  { code: "TR", name: "Turkey", dialCode: "+90", phoneLength: 10 },
  { code: "UA", name: "Ukraine", dialCode: "+380", phoneLength: 9 },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", phoneLength: 9 },
  { code: "GB", name: "United Kingdom", dialCode: "+44", phoneLength: 10 },
  { code: "US", name: "United States", dialCode: "+1", phoneLength: 10 },
  { code: "UY", name: "Uruguay", dialCode: "+598", phoneLength: 9 },
  { code: "UZ", name: "Uzbekistan", dialCode: "+998", phoneLength: 9 },
  { code: "VE", name: "Venezuela", dialCode: "+58", phoneLength: 10 },
  { code: "VN", name: "Vietnam", dialCode: "+84", phoneLength: 9 },
  { code: "YE", name: "Yemen", dialCode: "+967", phoneLength: 9 },
  { code: "ZM", name: "Zambia", dialCode: "+260", phoneLength: 9 },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", phoneLength: 9 },
];

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    sellerName: "",
    countryCode: "+91",
    phoneNumber: "",
    panNumber: "",
    gstin: "",
    companyName: "",
    shopName: "",
    blockNo: "",
    areaDistrict: "",
    state: "",
    pincode: "",
    securityPin: "",
  });
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [panNumberError, setPanNumberError] = useState("");
  const [gstinError, setGstinError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { theme } = useMode();

  const [maxPhoneLength, setMaxPhoneLength] = useState(10);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [showSecurityPin, setShowSecurityPin] = useState(false);

  useEffect(() => {
    const selectedCountry = countries.find(
      (country) => country.dialCode === formData.countryCode
    );
    if (selectedCountry) {
      const length = selectedCountry.phoneLength;
      if (Array.isArray(length)) {
        setMaxPhoneLength(Math.max(...length));
      } else {
        setMaxPhoneLength(length);
      }
    }
  }, [formData.countryCode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phoneNumber") {
      const isDigitOnly = /^\d+$/.test(value) || value === "";
      if (!isDigitOnly) {
        setPhoneNumberError("Please enter digits only");
        return;
      }
    }

    if (name === "pincode" || name === "securityPin") {
      const isDigitOnly = /^\d*$/.test(value);
      if (!isDigitOnly) {
        if (name === "pincode") setPincodeError("Please enter digits only");
        return;
      }
    }

    if (name === "panNumber" || name === "gstin") {
      newValue = value.toUpperCase();
    }

    setFormData({ ...formData, [name]: newValue });

    if (name === "phoneNumber") {
      const selectedCountry = countries.find(
        (country) => country.dialCode === formData.countryCode
      );
      if (selectedCountry) {
        const expectedLength = selectedCountry.phoneLength;
        const currentLength = value.length;

        if (Array.isArray(expectedLength)) {
          if (currentLength > 0 && !expectedLength.includes(currentLength)) {
            setPhoneNumberError(`Please enter a valid phone number of length ${expectedLength.join(" or ")} digits.`);
          } else {
            setPhoneNumberError("");
          }
        } else {
          if (currentLength > expectedLength) {
            setPhoneNumberError(`Phone number should not exceed ${expectedLength} digits.`);
          } else {
            setPhoneNumberError("");
          }
        }
      }
    }

    if (name === "pincode") {
      if (value.length > 0 && value.length !== 6) {
        setPincodeError("Pincode should be exactly 6 digits.");
      } else {
        setPincodeError("");
      }
    }

    if (name === "panNumber") {
      if (value.length > 0 && value.length !== 10) {
        setPanNumberError("PAN number should be exactly 10 characters.");
      } else {
        setPanNumberError("");
      }
    }

    if (name === "gstin") {
      if (value.length > 0 && value.length !== 15) {
        setGstinError("GSTIN should be exactly 15 characters.");
      } else {
        setGstinError("");
      }
    }
  };

  const handleCountrySelect = (dialCode) => {
    setFormData({ ...formData, countryCode: dialCode });
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumberError || pincodeError || panNumberError || gstinError) {
      console.log("Form submission blocked due to errors.");
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      console.log("User Profile Data:", formData);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 2000);
    }, 1500);
  };

  const currentCountry = countries.find(c => c.dialCode === formData.countryCode);

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 font-sans overflow-hidden ${theme
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
        }`}
      style={{ height: "93vh" }}
    >
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className={`text-2xl font-bold mb-3 ${theme ? "text-gray-800" : "text-white"}`}>User Profile</h1>
        <p className={`text-sm ${theme ? "text-gray-500" : "text-gray-400"}`}>Complete your profile information</p>
      </div>

      {/* Form Card */}
      <div
        className={`rounded-xl p-4 shadow-md border w-full flex-grow-0 overflow-hidden ${theme ? "bg-white border-gray-200" : "bg-neutral-800 border-neutral-700"
          }`}
        style={{ maxWidth: "1100px" }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-2">
            <div className="relative">
              <div
                className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center cursor-pointer border-2 ${theme
                    ? "bg-gray-100 border-gray-200 hover:border-purple-600"
                    : "bg-neutral-900 border-neutral-700 hover:border-purple-400"
                  }`}
                onClick={() => document.getElementById("profilePicture").click()}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${theme ? "text-gray-500" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
              </div>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className={`text-xs mt-1 ${theme ? "text-gray-500" : "text-gray-400"}`}>
              Click to upload your profile picture
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Seller Name *</label>
              <input
                type="text"
                name="sellerName"
                placeholder="Enter your full name"
                required
                value={formData.sellerName}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                  }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Phone Number *</label>
              <div className="flex gap-2">
                <div className="relative w-1/4" ref={dropdownRef}>
                  <div
                    className={`p-1.5 rounded-md text-sm cursor-pointer border focus:outline-none focus:ring-2 ${theme
                        ? "bg-white border-gray-300 text-gray-900 focus:ring-purple-600"
                        : "bg-neutral-900 border-neutral-700 text-white focus:ring-purple-400"
                      }`}
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  >
                    {currentCountry?.dialCode}
                    <svg
                      className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {isCountryDropdownOpen && (
                    <ul
                      className={`absolute z-10 w-full mt-1 rounded-md shadow-lg border overflow-y-auto ${theme
                          ? "bg-white border-gray-200 text-gray-900"
                          : "bg-neutral-800 border-neutral-700 text-white"
                        }`}
                      style={{ maxHeight: "150px" }}
                    >
                      {countries.map((country) => (
                        <li
                          key={country.code}
                          className={`p-1.5 text-sm cursor-pointer hover:bg-purple-600 hover:text-white ${theme ? "" : "hover:bg-purple-700"
                            }`}
                          onClick={() => handleCountrySelect(country.dialCode)}
                        >
                          {country.dialCode} ({country.code})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="98765 43210"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-3/4 p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${phoneNumberError ? "border-red-500" : ""
                    } ${theme
                      ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                      : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                    }`}
                  maxLength={maxPhoneLength}
                />
              </div>
              {phoneNumberError && (
                <p className="text-red-500 text-xs mt-1">{phoneNumberError}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>PAN Number *</label>
              <input
                type="text"
                name="panNumber"
                placeholder="ABCDE1234F"
                maxLength={10}
                required
                value={formData.panNumber}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${panNumberError ? "border-red-500" : ""
                  } ${theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                  }`}
              />
              {panNumberError && (
                <p className="text-red-500 text-xs mt-1">{panNumberError}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>GSTIN</label>
              <input
                type="text"
                name="gstin"
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
                value={formData.gstin}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${gstinError ? "border-red-500" : ""
                  } ${theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                  }`}
              />
              {gstinError && (
                <p className="text-red-500 text-xs mt-1">{gstinError}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Your Company Pvt Ltd"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                  }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Shop Name *</label>
              <input
                type="text"
                name="shopName"
                placeholder="Your Shop Name"
                required
                value={formData.shopName}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                  }`}
              />
            </div>

            {/* Security Pin Field */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                Security Pin{" "}
                <span className={theme ? "text-gray-500 text-xs" : "text-gray-400 text-xs"}>
                  (set up your security pin for future login)
                </span>{" "}
                *
              </label>
              <div className="relative">
                <input
                  type={showSecurityPin ? "text" : "password"}
                  name="securityPin"
                  placeholder="Enter 6-digit pin"
                  maxLength={6}
                  required
                  value={formData.securityPin}
                  onChange={handleInputChange}
                  className={`p-1.5 pr-8 rounded-md text-sm w-full focus:outline-none focus:ring-2 ${theme
                      ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                      : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowSecurityPin(!showSecurityPin)}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm leading-5"
                >
                  {showSecurityPin ? (
                    <img src={EyeOpen} className="h-4 w-4" alt="Show Pin" />
                  ) : (
                    <img src={EyeClosed} className="h-4 w-4" alt="Hide Pin" />
                  )}
                </button>
              </div>
            </div>

            {/* Shop Address Fields */}
            <div className="flex flex-col gap-1 md:col-span-3">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Shop Address *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="blockNo"
                    placeholder="Block no / Locality"
                    required
                    value={formData.blockNo}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${theme
                        ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600 placeholder-gray-400"
                        : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400 placeholder-gray-400"
                      }`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="areaDistrict"
                    placeholder="Area / District"
                    required
                    value={formData.areaDistrict}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${theme
                        ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600 placeholder-gray-400"
                        : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400 placeholder-gray-400"
                      }`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${theme
                        ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600 placeholder-gray-400"
                        : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400 placeholder-gray-400"
                      }`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${pincodeError ? "border-red-500" : ""
                      } ${theme
                        ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600 placeholder-gray-400"
                        : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400 placeholder-gray-400"
                      }`}
                    maxLength={6}
                  />
                  {pincodeError && (
                    <p className="text-red-500 text-xs mt-1">{pincodeError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-2">
            <button
              type="submit"
              className={`w-full p-2.5 text-white font-semibold rounded-md transition-all ${submitSuccess
                  ? "bg-green-500"
                  : theme
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-purple-700 hover:bg-purple-800"
                }`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : submitSuccess
                  ? "Profile Saved!"
                  : "Save and Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;