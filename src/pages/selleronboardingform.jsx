import React, { useState } from "react";

function SellerOnboardingForm() {
  const [formData, setFormData] = useState({
    sellerName: "",
    phoneNumber: "",
    shopAddress: "",
    panNumber: "",
    gstin: "",
    companyName: "",
    shopName: "",
    securityPin: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Uploaded Image:", profileImage);
    alert("Seller Profile Saved!");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#f7f7f7", padding: "20px", borderRight: "1px solid #ddd" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#c5c5f7",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              {preview ? (
                <img src={preview} alt="Profile Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ lineHeight: "120px", color: "#fff" }}>Upload</span>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: "10px" }} />
          </div>
        </div>
        <div>
          <p style={{ padding: "10px 0", cursor: "pointer" }}>👤 User Profile</p>
          <p style={{ padding: "10px 0", cursor: "pointer" }}>📊 Dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label>Seller Name:</label>
              <input type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} required />
            </div>
            <div>
              <label>Phone Number:</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div>
              <label>PAN Number:</label>
              <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} required />
            </div>
            <div>
              <label>GSTIN:</label>
              <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} required />
            </div>
            <div>
              <label>Company Registered Name:</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>
            <div>
              <label>Shop Name:</label>
              <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Shop Address:</label>
            <input type="text" name="shopAddress" value={formData.shopAddress} onChange={handleChange} required style={{ width: "100%" }} />
          </div>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                border: "none",
                background: "#4CAF50",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerOnboardingForm;
