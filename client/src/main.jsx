import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import SignInPage from "../pages/authentication/SignInPage";
import SignUpPage from "../pages/authentication/SignUpPage";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StrictMode>
            <Routes>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
        </StrictMode>
    </BrowserRouter>
);
