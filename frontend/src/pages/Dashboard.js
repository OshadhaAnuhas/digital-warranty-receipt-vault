import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    installments: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/product/getallproducts"
        );
        const products = res.data;
        const active = products.filter(
          (p) => p.warrantyStatus === "Active"
        ).length;
        const expired = products.filter(
          (p) => p.warrantyStatus === "Expired"
        ).length;
        const installments = products.filter(
          (p) => p.isInstallment
        ).length;
        setStats({
          total: products.length,
          active,
          expired,
          installments,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1280px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid #e4e4e7" }}>
        <p style={{ margin: "0 0 8px", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a1a1aa" }}>
          Overview
        </p>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.025em", color: "#18181b" }}>
          Dashboard
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: "0.875rem", color: "#52525b" }}>
          Summary of your warranty vault
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        
        <div style={cardStyle} onClick={() => navigate("/products")}>
          <p style={labelStyle}>Total Products</p>
          <p style={valueStyle}>{stats.total}</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: "3px solid #16a34a" }} onClick={() => navigate("/products")}>
          <p style={labelStyle}>Active Warranties</p>
          <p style={{ ...valueStyle, color: "#16a34a" }}>{stats.active}</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: "3px solid #b91c1c" }} onClick={() => navigate("/products")}>
          <p style={labelStyle}>Expired Warranties</p>
          <p style={{ ...valueStyle, color: "#b91c1c" }}>{stats.expired}</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: "3px solid #2563eb" }} onClick={() => navigate("/products")}>
          <p style={labelStyle}>Installment Products</p>
          <p style={{ ...valueStyle, color: "#2563eb" }}>{stats.installments}</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "16px", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a1a1aa" }}>
        Quick Actions
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/add-product")}
          style={primaryBtnStyle}
        >
          + Add Product
        </button>
        <button
          onClick={() => navigate("/products")}
          style={secondaryBtnStyle}
        >
          View All Products
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: "12px",
  padding: "20px",
  cursor: "pointer",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  transition: "box-shadow 0.15s ease",
};

const labelStyle = {
  margin: "0 0 8px",
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const valueStyle = {
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
  color: "#18181b",
  lineHeight: 1,
};

const primaryBtnStyle = {
  padding: "10px 20px",
  background: "#18181b",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "0.875rem",
  fontWeight: 500,
  cursor: "pointer",
};

const secondaryBtnStyle = {
  padding: "10px 20px",
  background: "white",
  color: "#18181b",
  border: "1px solid #e4e4e7",
  borderRadius: "10px",
  fontSize: "0.875rem",
  fontWeight: 500,
  cursor: "pointer",
};

export default Dashboard;