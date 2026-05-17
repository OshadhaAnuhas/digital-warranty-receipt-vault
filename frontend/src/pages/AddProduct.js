import { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

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
    <div className="add-product-page">
      <div className="add-product-container">
        <header className="add-product-header">
          <p className="add-product-eyebrow">Inventory</p>
          <h1 className="add-product-title">Add Product</h1>
          <p className="add-product-subtitle">
            Fill in the details below to add a new product to your vault.
          </p>
        </header>

        <div className="add-product-card">
          <form onSubmit={handleSubmit}>
            <section className="add-product-section">
              <p className="add-product-section-label">Product Information</p>
              <div className="add-product-grid">
                <div className="add-product-field">
                  <label className="add-product-label" htmlFor="productName">
                    Product Name
                  </label>
                  <input
                    id="productName"
                    type="text"
                    name="productName"
                    placeholder="e.g. HP Laptop"
                    value={formData.productName}
                    onChange={handleChange}
                    className="add-product-input"
                    required
                  />
                </div>
                <div className="add-product-field">
                  <label className="add-product-label" htmlFor="brand">
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    name="brand"
                    placeholder="e.g. HP"
                    value={formData.brand}
                    onChange={handleChange}
                    className="add-product-input"
                    required
                  />
                </div>
                <div className="add-product-field">
                  <label className="add-product-label" htmlFor="category">
                    Category
                  </label>
                  <input
                    id="category"
                    type="text"
                    name="category"
                    placeholder="e.g. Electronics"
                    value={formData.category}
                    onChange={handleChange}
                    className="add-product-input"
                    required
                  />
                </div>
                <div className="add-product-field">
                  <label className="add-product-label" htmlFor="storeName">
                    Store Name
                  </label>
                  <input
                    id="storeName"
                    type="text"
                    name="storeName"
                    placeholder="e.g. Abans"
                    value={formData.storeName}
                    onChange={handleChange}
                    className="add-product-input"
                    required
                  />
                </div>
              </div>
            </section>

            <hr className="add-product-divider" />

            <section className="add-product-section">
              <p className="add-product-section-label">Warranty Details</p>
              <div className="add-product-grid">
                <div className="add-product-field">
                  <label className="add-product-label" htmlFor="purchaseDate">
                    Purchase Date
                  </label>
                  <input
                    id="purchaseDate"
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="add-product-input"
                    required
                  />
                </div>
                <div className="add-product-field">
                  <label className="add-product-label" htmlFor="warrantyMonths">
                    Warranty Duration (Months)
                  </label>
                  <input
                    id="warrantyMonths"
                    type="number"
                    name="warrantyMonths"
                    placeholder="e.g. 24"
                    value={formData.warrantyMonths}
                    onChange={handleChange}
                    className="add-product-input"
                    required
                  />
                </div>
              </div>
            </section>

            <hr className="add-product-divider" />

            <section className="add-product-section">
              <p className="add-product-section-label">Installment Plan</p>
              <label className="add-product-checkbox-label">
                <input
                  type="checkbox"
                  className="add-product-checkbox"
                  checked={formData.isInstallment}
                  onChange={(e) =>
                    setFormData({ ...formData, isInstallment: e.target.checked })
                  }
                />
                <span className="add-product-checkbox-text">
                  This product was purchased on installments
                </span>
              </label>

              {formData.isInstallment && (
                <div className="add-product-grid add-product-grid--nested">
                  <div className="add-product-field">
                    <label className="add-product-label" htmlFor="totalInstallments">
                      Total Installments
                    </label>
                    <input
                      id="totalInstallments"
                      type="number"
                      name="totalInstallments"
                      placeholder="e.g. 24"
                      value={formData.totalInstallments}
                      onChange={handleChange}
                      className="add-product-input"
                    />
                  </div>
                  <div className="add-product-field">
                    <label className="add-product-label" htmlFor="monthlyAmount">
                      Monthly Amount (Rs.)
                    </label>
                    <input
                      id="monthlyAmount"
                      type="number"
                      name="monthlyAmount"
                      placeholder="e.g. 7500"
                      value={formData.monthlyAmount}
                      onChange={handleChange}
                      className="add-product-input"
                    />
                  </div>
                </div>
              )}
            </section>

            <hr className="add-product-divider" />

            <section className="add-product-section">
              <p className="add-product-section-label">Product Image</p>
              <label className="add-product-file-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProductImage}
                  className="add-product-file-input"
                />
                <div
                  className={`add-product-file-box${
                    productImageFileName ? " add-product-file-box--selected" : ""
                  }`}
                >
                  <p className="add-product-file-title">
                    {productImageFileName
                      ? productImageFileName
                      : "Click to upload product image"}
                  </p>
                  <p className="add-product-file-hint">
                    {productImageFileName
                      ? "File selected"
                      : "Optional · PNG, JPG up to 10MB"}
                  </p>
                </div>
              </label>
            </section>

            <hr className="add-product-divider" />

            <section className="add-product-section">
              <p className="add-product-section-label">Receipt Image</p>
              <label className="add-product-file-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="add-product-file-input"
                />
                <div
                  className={`add-product-file-box${
                    imageFileName ? " add-product-file-box--selected" : ""
                  }`}
                >
                  <p className="add-product-file-title">
                    {imageFileName ? imageFileName : "Click to upload receipt"}
                  </p>
                  <p className="add-product-file-hint">
                    {imageFileName ? "File selected" : "PNG, JPG up to 10MB"}
                  </p>
                </div>
              </label>
            </section>

            <div className="add-product-submit-wrap">
              <button type="submit" className="add-product-submit">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
