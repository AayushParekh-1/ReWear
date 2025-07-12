// src/components/ToastWrapper.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastWrapper = () => (
  <ToastContainer 
    position="top-center" 
    autoClose={3000} 
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default ToastWrapper;
