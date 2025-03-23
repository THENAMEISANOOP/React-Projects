import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewProduct from "./pages/ViewProduct"; 
import AddProducts from "./pages/AddProducts";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <AuthProvider>  
      <ToastContainer theme='dark' /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ViewProduct />} /> 
          <Route
            path="/addProduct"
            element={
              <ProtectedRoute>
                <AddProducts />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
}

export default App;
