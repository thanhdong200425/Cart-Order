import { useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";
import ThirdPartyButton from "../../components/buttons/ThirdPartyButton";
import TextField from "../../components/authentication/TextField";
import PasswordField from "../../components/authentication/PasswordField";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post(SERVER_URL + "/sign-in", {
                email: emailInputValue,
                password: passwordInputValue,
            });
            console.log(response.data);
            toast.success("Sign in successfully!", {
                autoClose: 2000,
                onClose: () => navigate("/"),
            });
        } catch (error) {
            console.log("Error in handleSubmit SignIn: " + error);
            if (error.response.status === 404)
                toast.error(error.response.data.error, {
                    autoClose: 2000,
                });
            if (error.response.status === 500)
                toast.error("Sorry, we encountered a problem!", {
                    autoClose: 2000,
                });
        }
    };

    return (
        <div className="flex max-h-screen bg-white text-white p-[5rem] rounded-lg">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white text-black rounded-l-3xl">
                <h1 className="text-[4rem] font-bold">Welcome</h1>
                <p className="text-gray-500 mt-2">We are glad to see you back with us</p>

                <div className="mt-6 w-full max-w-md">
                    <TextField type="email" placeholder="Email" iconPath={"/icons/user-icon.svg"} name={"email"} inputValue={emailInputValue} setInputValue={setEmailInputValue} />
                    <PasswordField name={"password"} inputValue={passwordInputValue} setInputValue={setPasswordInputValue} />
                    <SubmitButton content={"Next"} onClick={handleSubmit} />

                    <div className="text-center mt-4 font-semibold">Login with Others</div>
                    <div className="mt-4 flex flex-col gap-3">
                        <ThirdPartyButton styles={"bg-white !text-black flex items-center justify-center gap-2 shadow-xl border border-stone-300 "}>
                            <img src="/icons/google-icon.svg" alt="Google" className="w-5 h-5" />
                            Login with Google
                        </ThirdPartyButton>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 flex items-center justify-center rounded-3xl">
                <img src="/icons/introduce-image.jpg" alt="Sci-fi illustration" className="w-[100%] rounded-3xl" />
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignIn;
