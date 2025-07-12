// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
          ReWear – Community Clothing Exchange
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Exchange unused clothing through direct swaps or a point-based system. 
          Promote sustainable fashion and reduce textile waste!
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Start Swapping
          </Link>
          <Link 
            to="/browse"
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Browse Items
          </Link>
          <Link 
            to="/add-item"
            className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            List an Item
          </Link>
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Example featured items carousel style */}
        <div className="bg-white shadow rounded p-4">
          <img src="/blue-tshirt.jpg" alt="Blue T-Shirt" className="w-full h-48 object-cover rounded mb-2" />
          <h3 className="font-semibold text-lg">Blue T-Shirt</h3>
          <p className="text-sm text-gray-600">Available for swap</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <img src="/red-hoodie.jpg" alt="Red Hoodie" className="w-full h-48 object-cover rounded mb-2" />
          <h3 className="font-semibold text-lg">Red Hoodie</h3>
          <p className="text-sm text-gray-600">Redeem via points</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <img src="/green-jacket.jpg" alt="Green Jacket" className="w-full h-48 object-cover rounded mb-2" />
          <h3 className="font-semibold text-lg">Green Jacket</h3>
          <p className="text-sm text-gray-600">Available for swap</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
