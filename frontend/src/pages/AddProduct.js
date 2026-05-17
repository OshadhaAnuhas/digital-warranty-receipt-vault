import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    category: "",
    storeName: "",
    warrantyMonths: "",
    purchaseDate: "",
    isInstallment: false,
    totalInstallments: "",
    monthlyAmount: "",
  });

  const [receiptImage, setReceiptImage] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const [productImage, setProductImage] = useState(null);
const [productImageFileName, setProductImageFileName] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setReceiptImage(file);
    setImageFileName(file ? file.name : "");
  };

  const handleProductImage = (e) => {
  const file = e.target.files[0];
  setProductImage(file);
  setProductImageFileName(file ? file.name : "");
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("brand", formData.brand);
      data.append("category", formData.category);
      data.append("storeName", formData.storeName);
      data.append("warrantyMonths", formData.warrantyMonths);
      data.append("purchaseDate", formData.purchaseDate);
      data.append("isInstallment", formData.isInstallment);
      if (formData.isInstallment) {
        data.append("totalInstallments", formData.totalInstallments);
        data.append("monthlyAmount", formData.monthlyAmount);
      }
      if (receiptImage) {
        data.append("receiptImage", receiptImage);
      }
      if (productImage) {
  data.append("productImage", productImage);
}
      await axios.post("http://localhost:8000/api/product/create", data);
      alert("Product added successfully");
      setFormData({
        productName: "",
        brand: "",
        category: "",
        storeName: "",
        warrantyMonths: "",
        purchaseDate: "",
        isInstallment: false,
        totalInstallments: "",
        monthlyAmount: "",
      });
      setProductImage(null);
setProductImageFileName("");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        {/* Header */}
        <div style={headerStyle}>
          <p style={eyebrowStyle}>Inventory</p>
          <h1 style={titleStyle}>Add Product</h1>
          <p style={subtitleStyle}>
            Fill in the details below to add a new product to your vault.
          </p>
        </div>

        {/* Form Card */}
        <div style={cardStyle}>
          <form onSubmit={handleSubmit}>

            {/* Section: Product Info */}
            <div style={sectionStyle}>
              <p style={sectionLabelStyle}>Product Information</p>
              <div style={gridStyle}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="e.g. HP Laptop"
                    value={formData.productName}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="e.g. HP"
                    value={formData.brand}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Category</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. Electronics"
                    value={formData.category}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    placeholder="e.g. Abans"
                    value={formData.storeName}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={dividerStyle} />

            {/* Section: Warranty */}
            <div style={sectionStyle}>
              <p style={sectionLabelStyle}>Warranty Details</p>
              <div style={gridStyle}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Purchase Date</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Warranty Duration (Months)</label>
                  <input
                    type="number"
                    name="warrantyMonths"
                    placeholder="e.g. 24"
                    value={formData.warrantyMonths}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={dividerStyle} />

            {/* Section: Installments */}
            <div style={sectionStyle}>
              <p style={sectionLabelStyle}>Installment Plan</p>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={formData.isInstallment}
                  onChange={(e) =>
                    setFormData({ ...formData, isInstallment: e.target.checked })
                  }
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                <span style={{ fontSize: "0.875rem", color: "#18181b", fontWeight: 500 }}>
                  This product was purchased on installments
                </span>
              </label>

              {formData.isInstallment && (
                <div style={{ ...gridStyle, marginTop: "16px" }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Total Installments</label>
                    <input
                      type="number"
                      name="totalInstallments"
                      placeholder="e.g. 24"
                      value={formData.totalInstallments}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Monthly Amount (Rs.)</label>
                    <input
                      type="number"
                      name="monthlyAmount"
                      placeholder="e.g. 7500"
                      value={formData.monthlyAmount}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>
              )}
            </div>

            <div style={dividerStyle} />

            {/* Section: Product Image */}
<div style={sectionStyle}>
  <p style={sectionLabelStyle}>Product Image</p>
  <label style={fileUploadLabelStyle}>
    <input
      type="file"
      accept="image/*"
      onChange={handleProductImage}
      style={{ display: "none" }}
    />
    <div style={fileUploadBoxStyle}>
      <p style={{ margin: "0 0 4px", fontSize: "0.875rem", fontWeight: 500, color: "#18181b" }}>
        {productImageFileName ? productImageFileName : "Click to upload product image"}
      </p>
      <p style={{ margin: 0, fontSize: "0.75rem", color: "#a1a1aa" }}>
        {productImageFileName ? "File selected" : "Optional · PNG, JPG up to 10MB"}
      </p>
    </div>
  </label>
</div>

<div style={dividerStyle} />

            {/* Section: Receipt Image */}
            <div style={sectionStyle}>
              <p style={sectionLabelStyle}>Receipt Image</p>
              <label style={fileUploadLabelStyle}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  style={{ display: "none" }}
                />
                <div style={fileUploadBoxStyle}>
                  <p style={{ margin: "0 0 4px", fontSize: "0.875rem", fontWeight: 500, color: "#18181b" }}>
                    {imageFileName ? imageFileName : "Click to upload receipt"}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#a1a1aa" }}>
                    {imageFileName ? "File selected" : "PNG, JPG up to 10MB"}
                  </p>
                </div>
              </label>
            </div>

            {/* Submit */}
            <div style={{ paddingTop: "8px" }}>
              <button type="submit" style={submitBtnStyle}>
                Add Product
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

// Styles
const pageStyle = {
  padding: "20px",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  WebkitFontSmoothing: "antialiased",
};

const containerStyle = {
  maxWidth: "720px",
  margin: "0 auto",
};

const headerStyle = {
  marginBottom: "32px",
  paddingBottom: "24px",
  borderBottom: "1px solid #e4e4e7",
};

const eyebrowStyle = {
  margin: "0 0 8px",
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#a1a1aa",
};

const titleStyle = {
  margin: "0",
  fontSize: "1.5rem",
  fontWeight: 600,
  letterSpacing: "-0.025em",
  color: "#18181b",
};

const subtitleStyle = {
  margin: "8px 0 0",
  fontSize: "0.875rem",
  color: "#52525b",
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: "12px",
  padding: "32px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const sectionStyle = {
  marginBottom: "8px",
};

const sectionLabelStyle = {
  margin: "0 0 16px",
  fontSize: "0.6875rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#a1a1aa",
};

const dividerStyle = {
  borderTop: "1px solid #f4f4f5",
  margin: "24px 0",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "16px",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = {
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "#18181b",
};

const inputStyle = {
  height: "2.25rem",
  padding: "0 12px",
  fontSize: "0.875rem",
  color: "#18181b",
  background: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  outline: "none",
  fontFamily: "inherit",
  width: "100%",
  boxSizing: "border-box",
};

const checkboxLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
};

const fileUploadLabelStyle = {
  cursor: "pointer",
  display: "block",
};

const fileUploadBoxStyle = {
  border: "1px dashed #d4d4d8",
  borderRadius: "10px",
  padding: "24px",
  textAlign: "center",
  background: "#fafafa",
  transition: "border-color 0.15s ease",
};

const submitBtnStyle = {
  width: "100%",
  height: "2.5rem",
  background: "#18181b",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "0.875rem",
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
};

export default AddProduct;