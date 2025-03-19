import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import SignInPage from "../pages/authentication/SignInPage";
import SignUpPage from "../pages/authentication/SignUpPage";
import HomePage from "../pages/main/HomePage";
import CartPage from "../pages/main/CartPage";
import { CartProvider } from "../context/CartContext";
import { ToastContainer } from "react-toastify";
import ProductPage from "../pages/main/ProductPage";
import { InfoUserProvider } from "../context/InfoContext";
import { AuthProvider } from "../context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        {/* Temporarily disabled StrictMode for developement */}
        <StrictMode>
            <AuthProvider>
                <InfoUserProvider>
                    <CartProvider>
                        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                        <Routes>
                            <Route path="/sign-in" element={<SignInPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/product/:productId" element={<ProductPage />} />
                        </Routes>
                    </CartProvider>
                </InfoUserProvider>
            </AuthProvider>
        </StrictMode>
    </BrowserRouter>
);
