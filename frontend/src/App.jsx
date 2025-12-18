import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-600 text-center mt-10">
      Tailwind is working 🚀
    </h1>
  );
}

