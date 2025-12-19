import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(form);
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-purple-600">
      <Motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 backdrop-blur p-8 rounded-xl shadow-xl w-80 space-y-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <LogIn /> Login
        </h2>

        <div className="flex items-center border rounded px-3">
          <Mail className="text-gray-400" size={18} />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded px-3">
          <Lock className="text-gray-400" size={18} />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        <Motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          Login
        </Motion.button>

        <p className="text-sm text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </Motion.form>
    </div>
  );
}
