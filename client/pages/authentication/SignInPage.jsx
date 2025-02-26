import { useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import TextField from "../../components/authentication/TextField";
import PasswordField from "../../components/authentication/PasswordField";
import { ToastContainer, toast } from "react-toastify";
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import LeftContainer from "../../components/layouts/authentication/LeftContainer";
import RightContainer from "../../components/layouts/authentication/RightContainer";
import { handleSubmit, validateInput } from "../../helper_functions/authentication";

const SignInPage = () => {
    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!validateInput(emailInputValue, passwordInputValue)) return;
        await handleSubmit(SERVER_URL + "/sign-in", {
            emailInputValue: emailInputValue,
            passwordInputValue: passwordInputValue,
            messageWhenSuccess: "Sign in successfully",
            redirectWhenSuccess: () => navigate("/"),
        });
    };

    return (
        <div className="flex max-h-screen bg-white text-white p-[5rem] rounded-lg">
            <LeftContainer title={"Welcome"} subTitle={"We are glad to see you back with us"}>
                <TextField type="email" placeholder="Email" iconPath={"/icons/user-icon.svg"} name={"email"} inputValue={emailInputValue} setInputValue={setEmailInputValue} />
                <PasswordField name={"password"} inputValue={passwordInputValue} setInputValue={setPasswordInputValue} />
                <SubmitButton content={"Next"} onClick={handleSignIn} />
            </LeftContainer>
            <RightContainer imgPath={"/icons/introduce-image.jpg"} />
            <ToastContainer />
        </div>
    );
};

export default SignInPage;
