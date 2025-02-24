import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import SignIn from "../components/authentication/SignIn";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StrictMode>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
            </Routes>
        </StrictMode>
    </BrowserRouter>
);
