import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

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
    <div className="dashboard-page">
      <header className="dashboard-header">
        <p className="dashboard-eyebrow">Overview</p>
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Summary of your warranty vault</p>
      </header>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div
          className="dashboard-stat-card"
          onClick={() => navigate("/products")}
        >
          <p className="dashboard-stat-label">Total Products</p>
          <p className="dashboard-stat-value">{stats.total}</p>
          <p className="dashboard-stat-hint">View all products</p>
        </div>

        <div
          className="dashboard-stat-card dashboard-stat-card--active"
          onClick={() => navigate("/products")}
        >
          <p className="dashboard-stat-label">Active Warranties</p>
          <p className="dashboard-stat-value dashboard-stat-value--active">
            {stats.active}
          </p>
          <p className="dashboard-stat-hint">View all products</p>
        </div>

        <div
          className="dashboard-stat-card dashboard-stat-card--expired"
          onClick={() => navigate("/products")}
        >
          <p className="dashboard-stat-label">Expired Warranties</p>
          <p className="dashboard-stat-value dashboard-stat-value--expired">
            {stats.expired}
          </p>
          <p className="dashboard-stat-hint">View all products</p>
        </div>

        <div
          className="dashboard-stat-card dashboard-stat-card--installments"
          onClick={() => navigate("/products")}
        >
          <p className="dashboard-stat-label">Installment Products</p>
          <p className="dashboard-stat-value dashboard-stat-value--installments">
            {stats.installments}
          </p>
          <p className="dashboard-stat-hint">View all products</p>
        </div>
      </div>

      {/* Quick Actions */}
      <p className="dashboard-section-label">Quick Actions</p>
      <div className="dashboard-actions">
        <button
          type="button"
          onClick={() => navigate("/add-product")}
          className="dashboard-btn-primary"
        >
          + Add Product
        </button>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="dashboard-btn-secondary"
        >
          View All Products
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
