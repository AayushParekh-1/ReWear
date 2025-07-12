// src/pages/Register.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!/\S+@\S+\.\S+/.test(inputs.email)) tempErrors.email = "Invalid email format";
    if (inputs.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      toast.success("Registered Successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form className="p-6 bg-white rounded shadow-md w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <FormInput
          label="Email"
          type="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          placeholder="Enter your email"
          error={errors.email}
        />
        <FormInput
          label="Password"
          type="password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          placeholder="Enter your password"
          error={errors.password}
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
