import { Link, useNavigate } from "react-router-dom";

function Layout({ children, onFilter }) {
  const navigate = useNavigate();

  const handleFilter = (type, category = null) => {
    navigate("/products");
    if (onFilter) onFilter(type, category);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: "220px",
          background: "#1f2937",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Vault System</h2>

        <p style={{ color: "#9ca3af", fontSize: "12px", marginBottom: "4px" }}>
          NAVIGATION
        </p>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          Products
        </Link>
        <Link to="/add-product" style={{ color: "white", textDecoration: "none" }}>
          Add Product
        </Link>

        <hr style={{ borderColor: "#374151", margin: "16px 0" }} />

        <p style={{ color: "#9ca3af", fontSize: "12px", marginBottom: "4px" }}>
          FILTERS
        </p>
        <button
          onClick={() => handleFilter("all")}
          style={filterBtnStyle}
        >
          All Products
        </button>
        <button
          onClick={() => handleFilter("expired")}
          style={filterBtnStyle}
        >
          Expired Warranty
        </button>
        <button
          onClick={() => handleFilter("installments")}
          style={filterBtnStyle}
        >
          Installments
        </button>
        <button
          onClick={() => handleFilter("category", "Electronics")}
          style={filterBtnStyle}
        >
          Electronics
        </button>
      </div>

      <div style={{ flex: 1, padding: "20px", background: "#f3f4f6" }}>
        {children}
      </div>
    </div>
  );
}

const filterBtnStyle = {
  background: "none",
  border: "none",
  color: "white",
  textAlign: "left",
  cursor: "pointer",
  padding: "4px 0",
  fontSize: "14px",
};

export default Layout;