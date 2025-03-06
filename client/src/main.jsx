import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import SignInPage from "../pages/authentication/SignInPage";
import SignUpPage from "../pages/authentication/SignUpPage";
import HomePage from "../pages/main/HomePage";
import CartPage from "../pages/main/CartPage";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StrictMode>
            <Routes>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </StrictMode>
    </BrowserRouter>
);
