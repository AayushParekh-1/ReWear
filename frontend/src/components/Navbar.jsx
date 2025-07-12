// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-gray-800">ReWear</Link>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        {currentUser ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/add-item" className="hover:text-blue-600">Add Item</Link>
            <button 
              onClick={handleLogout} 
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/register" className="hover:text-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
