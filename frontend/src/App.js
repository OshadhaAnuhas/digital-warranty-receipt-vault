import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";

function App() {
  const [activeFilter, setActiveFilter] = useState({ type: "all", category: null });

  const handleFilter = (type, category = null) => {
    setActiveFilter({ type, category });
  };

  return (
    <BrowserRouter>
      <Layout onFilter={handleFilter}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/products"
            element={<ProductList activeFilter={activeFilter} />}
          />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;