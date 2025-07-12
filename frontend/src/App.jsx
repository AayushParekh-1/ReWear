// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastWrapper from "./components/ToastWrapper";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import ItemDetail from "./pages/ItemsDetail";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const { currentUser } = useAuth();

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/add-item" 
          element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/item/:id" 
          element={
            <ProtectedRoute>
              <ItemDetail />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
      <ToastWrapper />
    </BrowserRouter>
  );
};

export default App;
