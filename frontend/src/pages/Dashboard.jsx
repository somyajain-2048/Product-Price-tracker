import { useEffect, useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import AddProductForm from "../components/AddProductForm";
import PriceChart from "../components/PriceChart";
import { analyzePriceTrend, predictBestTimeToBuy } from "../utils/priceIntelligence";

const Dashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSite, setFilterSite] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // =========================
  // AUTH CHECK
  // =========================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      alert("product deleted");
      await fetchProducts()
    } catch (error) {
      console.log(error);
      alert("delete failed");
    }
  }

  const toggleFavorite = async (e, id) => {
    e.stopPropagation();
    try {
      await api.patch(`/products/${id}/favorite`);
      setProducts(products.map(p => p._id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    } catch (error) {
      console.log(error);
      alert("Failed to update favorite status");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSite = filterSite === "all" || product.site.toLowerCase() === filterSite.toLowerCase();
      const matchesFavorite = showFavoritesOnly ? product.isFavorite : true;
      return matchesSearch && matchesSite && matchesFavorite;
    });
  }, [products, searchTerm, filterSite, showFavoritesOnly]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Product Dashboard</h1>

      <AddProductForm fetchProducts={fetchProducts} />

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search for a product..." 
            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="w-full md:w-48 py-3 px-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white capitalize cursor-pointer transition"
          value={filterSite}
          onChange={(e) => setFilterSite(e.target.value)}
        >
          <option value="all">All Websites</option>
          <option value="amazon">Amazon</option>
          <option value="flipkart">Flipkart</option>
          <option value="meesho">Meesho</option>
          <option value="myntra">Myntra</option>
        </select>
        <button 
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`py-3 px-6 rounded-lg font-bold transition flex items-center gap-2 ${showFavoritesOnly ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          <svg className="w-5 h-5" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          {showFavoritesOnly ? "Wishlist" : "All Items"}
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const trend = analyzePriceTrend(product.priceHistory, product.currentPrice, product.lowestPrice);
            const prediction = predictBestTimeToBuy(product.priceHistory, product.currentPrice, product.lowestPrice);

            return (
              <div 
                key={product._id} 
                onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
                className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col relative overflow-hidden"
              >
                {/* Heart / Favorite Button */}
                <button 
                  onClick={(e) => toggleFavorite(e, product._id)}
                  className={`absolute top-3 left-3 p-2 rounded-full z-10 transition ${product.isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-200'}`}
                >
                  <svg className="w-5 h-5" fill={product.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>

                {/* Prediction Badge */}
                {prediction && (
                  <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full ${prediction.color} z-10`}>
                    {prediction.label}
                  </div>
                )}

                <div className="overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center mb-4 relative p-2 h-48 mt-8">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between mt-auto mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {product.site}
                  </span>
                  
                  {/* Trend Badge */}
                  {trend && (
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${trend.color}`}>
                      {trend.label}
                    </span>
                  )}
                </div>
                
                <h2 className="font-bold text-gray-800 line-clamp-2 leading-tight min-h-[40px]">
                  {product.title}
                </h2>

                <div className="mt-4 pt-3 border-t border-gray-50 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Current Price</p>
                    <p className="text-xl font-extrabold text-gray-900">₹{product.currentPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Lowest</p>
                    <p className="text-sm font-bold text-green-600">₹{product.lowestPrice}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
