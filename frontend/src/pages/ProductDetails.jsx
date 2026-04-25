import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PriceChart from "../components/PriceChart";
import api from "../api/axios";
import { analyzePriceTrend, predictBestTimeToBuy } from "../utils/priceIntelligence";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const product = location.state?.product;
  const [isFavorite, setIsFavorite] = useState(product?.isFavorite || false);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) return null;

  const trend = analyzePriceTrend(product.priceHistory, product.currentPrice, product.lowestPrice);
  const prediction = predictBestTimeToBuy(product.priceHistory, product.currentPrice, product.lowestPrice);

  const toggleFavorite = async () => {
    try {
      await api.patch(`/products/${product._id}/favorite`);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
      alert("Failed to update favorite status");
    }
  };

  const deleteProduct = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${product._id}`);
      alert("Product deleted");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <button 
        onClick={() => navigate("/")}
        className="mb-6 flex items-center text-gray-600 hover:text-black transition font-semibold"
      >
        <span className="mr-2 text-xl">←</span> Back to Dashboard
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row max-w-6xl mx-auto">
        {/* Left Side: Image */}
        <div className="md:w-1/2 bg-white flex items-center justify-center p-10 border-r border-gray-100 relative">
          {prediction && (
            <div className={`absolute top-6 left-6 px-4 py-2 rounded-lg text-sm font-black shadow-md ${prediction.color} z-10 animate-pulse`}>
              AI PREDICTION: {prediction.label}
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-auto max-h-[500px] object-contain rounded-lg transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  {product.site}
                </span>
                {trend && (
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider ${trend.color}`}>
                    {trend.label}
                  </span>
                )}
              </div>
              
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition shadow-sm ${isFavorite ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-200'}`}
              >
                <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 p-5 rounded-xl border border-green-100 shadow-sm">
                <p className="text-sm text-green-600 font-medium mb-1 uppercase tracking-wide">Current Price</p>
                <p className="text-3xl font-black text-green-700">₹{product.currentPrice}</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                <p className="text-sm text-blue-600 font-medium mb-1 uppercase tracking-wide">Lowest Price</p>
                <p className="text-3xl font-black text-blue-700">₹{product.lowestPrice}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-inner">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              Price History
            </h3>
            {product.priceHistory && product.priceHistory.length > 0 ? (
              <PriceChart history={product.priceHistory} />
            ) : (
              <p className="text-gray-500 italic text-center py-10 bg-white rounded border border-dashed border-gray-300">No price history available yet.</p>
            )}
          </div>

          <button 
            onClick={deleteProduct}
            className="w-full bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 hover:border-red-500 font-bold py-4 px-4 rounded-xl transition duration-300 flex items-center justify-center group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
