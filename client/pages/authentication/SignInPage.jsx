import { useContext, useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import TextField from "../../components/authentication/TextField";
import PasswordField from "../../components/authentication/PasswordField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LeftContainer from "../../components/layouts/authentication/LeftContainer";
import RightContainer from "../../components/layouts/authentication/RightContainer";
import { validateInput } from "../../helper_functions/authentication";
import AuthContext from "../../context/AuthContext.jsx";

const SignInPage = () => {
    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const navigate = useNavigate();
    const { signIn, isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) navigate("/");

    const handleSignIn = async () => {
        if (!validateInput(emailInputValue, passwordInputValue)) return;
        const response = await signIn(emailInputValue, passwordInputValue);
        if (response) {
            toast.success("Sign in successfully!");
            return navigate("/");
        }
        toast.error("Sign in failed");
    };

    return (
        <div className="flex max-h-screen bg-white text-white p-[5rem] rounded-lg">
            <LeftContainer title={"Welcome"} subTitle={"We are glad to see you back with us"} alternativeMode={"sign-up"}>
                <TextField type="email" placeholder="Email" iconPath={"/icons/user-icon.svg"} name={"email"} inputValue={emailInputValue} setInputValue={setEmailInputValue} />
                <PasswordField name={"password"} inputValue={passwordInputValue} setInputValue={setPasswordInputValue} />
                <SubmitButton content={"Next"} onClick={handleSignIn} />
            </LeftContainer>
            <RightContainer imgPath={"/icons/introduce-image.jpg"} />
        </div>
    );
};

export default SignInPage;
