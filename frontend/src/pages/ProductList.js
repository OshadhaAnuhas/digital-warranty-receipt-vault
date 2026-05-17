import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./ProductList.css";

function ProductList({ activeFilter }) {
  const [products, setProducts] = useState([]);
  const [installmentData, setInstallmentData] = useState({});
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    productName: "",
    brand: "",
    category: "",
    storeName: "",
    warrantyMonths: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/product/getallproducts");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchByCategory = async (category) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/product/category/${category}`);
      setProducts(res.data);
    } catch (error) {
      setProducts([]);
    }
  };

  const fetchByFilter = async (type) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/product/${type}`);
      setProducts(res.data);
    } catch (error) {
      setProducts([]);
    }
  };

  // Reusable refresh handler that honors active filters
  const refreshData = useCallback(() => {
    if (!activeFilter || activeFilter.type === "all") {
      fetchProducts();
    } else if (activeFilter.type === "category") {
      fetchByCategory(activeFilter.category);
    } else {
      fetchByFilter(activeFilter.type);
    }
  }, [activeFilter]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/product/delete/${id}`);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInstallmentChange = (id, field, value) => {
    setInstallmentData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const addInstallment = async (id) => {
    const data = installmentData[id] || {};
    try {
      await axios.post(`http://localhost:8000/api/product/installment/${id}`, {
        amountPaid: data.amountPaid || 0,
        note: data.note || "",
      });
      
      // Clear inputs for this specific product card on success
      setInstallmentData((prev) => ({
        ...prev,
        [id]: { amountPaid: "", note: "" },
      }));

      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setEditForm({
      productName: product.productName,
      brand: product.brand,
      category: product.category,
      storeName: product.storeName,
      warrantyMonths: product.warrantyMonths,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:8000/api/product/update/${editId}`, editForm);
      setEditId(null);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-list-page">
      <div className="product-list-container">
        <header className="product-list-header">
          <div className="product-list-header-main">
            <p className="product-list-eyebrow">Inventory</p>
            <h1 className="product-list-title">Products</h1>
            <p className="product-list-subtitle">
              {products.length === 0
                ? "Manage warranties and receipts in one place"
                : "Track warranties, receipts, and installment payments"}
            </p>
          </div>
          {products.length > 0 && (
            <span className="product-list-count">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          )}
        </header>

        {/* ================= EDIT FORM ================= */}
        {editId && (
          <div className="product-edit-panel">
            <div className="product-edit-panel-header">
              <h3 className="product-edit-panel-title">Edit product</h3>
              <p className="product-edit-panel-desc">
                Update product details and save your changes.
              </p>
            </div>
            <div className="product-edit-form">
              <input
                name="productName"
                value={editForm.productName}
                onChange={handleEditChange}
                placeholder="Product Name"
              />
              <input
                name="brand"
                value={editForm.brand}
                onChange={handleEditChange}
                placeholder="Brand"
              />
              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                placeholder="Category"
              />
              <input
                name="storeName"
                value={editForm.storeName}
                onChange={handleEditChange}
                placeholder="Store Name"
              />
              <input
                name="warrantyMonths"
                value={editForm.warrantyMonths}
                onChange={handleEditChange}
                placeholder="Warranty Months"
              />
            </div>
            <div className="product-edit-actions">
              <button
                type="button"
                className="product-edit-btn-cancel"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="product-edit-btn-save"
                onClick={updateProduct}
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        {/* ================= PRODUCT LIST ================= */}
        {products.length === 0 ? (
          <div className="product-list-empty">
            <p className="product-list-empty-title">
              {activeFilter && activeFilter.type !== "all"
                ? "No products match this filter"
                : "No products yet"}
            </p>
            <p className="product-list-empty-text">
              {activeFilter && activeFilter.type !== "all"
                ? "Try a different filter or view all products."
                : "Add a product to start tracking warranties and receipts."}
            </p>
            {activeFilter && activeFilter.type !== "all" && (
              <button
                onClick={() => fetchProducts()}
                style={{
                  marginTop: "12px",
                  padding: "8px 20px",
                  background: "#1f2937",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Clear filter
              </button>
            )}
          </div>
        ) : (
          <div className="product-list-grid">
            {products.map((p) => (
              <article key={p._id} className="product-card">
                {/* ================= IMAGE / RECEIPT ================= */}
                <div className="product-card-image-wrap">
                  {p.productImage ? (
                    <img
                      src={`http://localhost:8000/uploads/${p.productImage}`}
                      alt={p.productName}
                      className="product-card-image"
                    />
                  ) : (
                    <div className="product-card-image-placeholder">
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "#e4e4e7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25rem",
                        marginBottom: "8px",
                      }}>
                        📦
                      </div>
                      <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: "0.875rem", color: "#18181b" }}>
                        {p.productName}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#a1a1aa" }}>
                        {p.brand} · {p.category}
                      </p>
                    </div>
                  )}
                  {p.receiptImage && (
                    <a
                      href={`http://localhost:8000/uploads/${p.receiptImage}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        fontSize: "0.75rem",
                        color: "#2563eb",
                        textDecoration: "none",
                        padding: "4px 10px",
                        border: "1px solid #bfdbfe",
                        borderRadius: "20px",
                        background: "#eff6ff",
                      }}
                    >
                      View Receipt
                    </a>
                  )}
                </div>

                <div className="product-card-body">
                  <header className="product-card-header">
                    <h3 className="product-card-title">{p.productName}</h3>
                    {p.category && (
                      <span className="product-card-category">{p.category}</span>
                    )}
                  </header>

                  <dl className="product-card-meta">
                    <div>
                      <dt>Brand</dt>
                      <dd>{p.brand || "—"}</dd>
                    </div>
                    <div>
                      <dt>Store</dt>
                      <dd>{p.storeName || "—"}</dd>
                    </div>
                    <div>
                      <dt>Warranty</dt>
                      <dd>{p.warrantyMonths} mo</dd>
                    </div>
                    <div>
                      <dt>Expires</dt>
                      <dd>
                        {p.warrantyExpiryDate
                          ? new Date(p.warrantyExpiryDate).toLocaleDateString()
                          : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt>Warranty Status</dt>
                      <dd>{p.warrantyStatus || "—"}</dd>
                    </div>
                    {p.isInstallment && (
                      <>
                        <div>
                          <dt>Installment Status</dt>
                          <dd>{p.installmentStatus || "—"}</dd>
                        </div>
                        <div>
                          <dt>Remaining Installments</dt>
                          <dd>{p.remainingInstallments}</dd>
                        </div>
                        <div>
                          <dt>Remaining Balance</dt>
                          <dd>Rs. {p.remainingBalance}</dd>
                        </div>
                      </>
                    )}
                  </dl>

                  <div className="product-card-actions">
                    <button
                      type="button"
                      className="product-card-btn product-card-btn-edit"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="product-card-btn product-card-btn-delete"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </div>

                  {/* ================= INSTALLMENTS ================= */}
                  {p.isInstallment && (
                    <section className="product-card-installments">
                      <h4 className="product-card-section-label">Installments</h4>

                      {p.installmentHistory?.length > 0 ? (
                        <div className="product-card-installment-list">
                          {p.installmentHistory.map((i, index) => (
                            <div
                              key={index}
                              className="product-card-installment-item"
                            >
                              <dl className="product-card-installment-rows">
                                <div className="product-card-installment-row">
                                  <dt>Amount</dt>
                                  <dd>{i.amountPaid}</dd>
                                </div>
                                <div className="product-card-installment-row">
                                  <dt>Date</dt>
                                  <dd>
                                    {i.paidDate
                                      ? new Date(i.paidDate).toLocaleDateString()
                                      : "—"}
                                  </dd>
                                </div>
                                {i.note && (
                                  <div className="product-card-installment-row">
                                    <dt>Note</dt>
                                    <dd>{i.note}</dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="product-card-installment-empty">
                          No payments recorded
                        </p>
                      )}

                      <div className="product-card-installment-form">
                        <input
                          placeholder="Amount"
                          value={installmentData[p._id]?.amountPaid || ""}
                          onChange={(e) =>
                            handleInstallmentChange(
                              p._id,
                              "amountPaid",
                              e.target.value
                            )
                          }
                        />
                        <input
                          placeholder="Note"
                          value={installmentData[p._id]?.note || ""}
                          onChange={(e) =>
                            handleInstallmentChange(p._id, "note", e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="product-card-btn-primary"
                          onClick={() => addInstallment(p._id)}
                        >
                          Add payment
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;