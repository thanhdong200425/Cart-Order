import { toast, ToastContainer } from "react-toastify";
import LeftContainer from "../../components/layouts/authentication/LeftContainer";
import RightContainer from "../../components/layouts/authentication/RightContainer";
import TextField from "../../components/authentication/TextField";
import PasswordField from "../../components/authentication/PasswordField";
import { useContext, useEffect, useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import { validateInput } from "../../helper_functions/authentication";
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";

const SignUpPage = () => {
    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [confirmPasswordInputValue, setConfirmPasswordValue] = useState("");
    const [isFocusInEmail, setIsFocusInEmail] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, signUp } = useContext(AuthContext);

    if (isAuthenticated) navigate("/");

    const handleFocusInEmail = () => setIsFocusInEmail(true);
    const handleBlurInEmail = () => setIsFocusInEmail(false);

    useEffect(() => {
        if (!isFocusInEmail && emailInputValue) {
            const checkEmail = async () => {
                try {
                    const response = await axios.post(SERVER_URL + "/check-email", {
                        email: emailInputValue,
                    });
                    setIsValidEmail(true);
                    console.log(response);
                } catch (error) {
                    toast.error(error.response.data.error);
                    setIsValidEmail(false);
                    return;
                }
            };
            checkEmail();
        }
    }, [emailInputValue, isFocusInEmail]);

    const handleSignUp = async () => {
        if (!isValidEmail) {
            toast.error("Please use a different email!");
            return;
        }
        if (!validateInput(emailInputValue, passwordInputValue, confirmPasswordInputValue)) return;
        const response = await signUp(emailInputValue, passwordInputValue);
        if (response) {
            toast.success("Sign in successfully!");
            return navigate("/");
        }
        toast.error("Sign in failed");
    };

    return (
        <div className="flex max-h-screen bg-white text-white p-[5rem] rounded-lg">
            <LeftContainer title={"Sign Up"} subTitle={"Create your account and start shopping today"} alternativeMode={"sign-in"}>
                <TextField type="email" placeholder="Email" iconPath={"/icons/user-icon.svg"} name={"email"} inputValue={emailInputValue} setInputValue={setEmailInputValue} onFocus={handleFocusInEmail} onBlur={handleBlurInEmail} />
                <PasswordField name={"password"} inputValue={passwordInputValue} setInputValue={setPasswordInputValue} />
                <PasswordField name={"confirm-password"} inputValue={confirmPasswordInputValue} setInputValue={setConfirmPasswordValue} placeholder={"Confirm Password"} />
                <SubmitButton content={"Create account"} onClick={handleSignUp} />
            </LeftContainer>
            <RightContainer imgPath={"/icons/signup-image.jpg"} />
            <ToastContainer />
        </div>
    );
};

export default SignUpPage;
