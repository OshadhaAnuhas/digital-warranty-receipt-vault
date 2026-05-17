import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";

function Layout({ children, onFilter }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilter = (type, category = null) => {
    navigate("/products");
    if (onFilter) onFilter(type, category);
  };

  const navLinkClass = (path) => {
    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname === path;
    return `layout-nav-link${isActive ? " layout-nav-link--active" : ""}`;
  };

  return (
    <div className="layout-root">
      <aside className="layout-sidebar">
        <h2 className="layout-brand">Vault System</h2>

        <p className="layout-section-label">Navigation</p>
        <nav className="layout-nav" aria-label="Main">
          <Link to="/" className={navLinkClass("/")}>
            Dashboard
          </Link>
          <Link to="/products" className={navLinkClass("/products")}>
            Products
          </Link>
          <Link to="/add-product" className={navLinkClass("/add-product")}>
            Add Product
          </Link>
        </nav>

        <hr className="layout-divider" />

        <p className="layout-section-label">Filters</p>
        <div className="layout-filters">
          <button
            type="button"
            className="layout-filter-btn"
            onClick={() => handleFilter("all")}
          >
            All Products
          </button>
          <button
            type="button"
            className="layout-filter-btn"
            onClick={() => handleFilter("expired")}
          >
            Expired Warranty
          </button>
          <button
            type="button"
            className="layout-filter-btn"
            onClick={() => handleFilter("installments")}
          >
            Installments
          </button>
          <button
            type="button"
            className="layout-filter-btn"
            onClick={() => handleFilter("category", "Electronics")}
          >
            Electronics
          </button>
        </div>
      </aside>

      <main className="layout-main">{children}</main>
    </div>
  );
}

export default Layout;
