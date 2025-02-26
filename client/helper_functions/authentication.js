import { toast } from "react-toastify";
import axios from "axios";

export const handleSubmit = async (route, { emailInputValue, passwordInputValue, confirmPassword = null, messageWhenSuccess, redirectWhenSuccess }) => {
    try {
        const response = await axios.post(route, {
            email: emailInputValue,
            password: passwordInputValue,
        });
        console.log(response.data);
        toast.success(messageWhenSuccess, {
            autoClose: 2000,
            onClose: redirectWhenSuccess,
        });
    } catch (error) {
        console.log("Error in handleSubmit: " + error);
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

export const validateInput = (emailInputValue, passwordInputValue, confirmPasswordInputValue = null) => {
    if (emailInputValue.trim().length === 0 || passwordInputValue.trim().length === 0) {
        toast.error("Please fill all the input fields!");
        return false;
    }
    if (!emailInputValue.trim().includes("@")) {
        toast.error("Please enter a valid email!");
        return false;
    }
    if (confirmPasswordInputValue !== null) {
        if (confirmPasswordInputValue.trim().length === 0) {
            toast.error("Please fill all the input fields!");
            return false;
        }
        if (confirmPasswordInputValue.trim() !== passwordInputValue.trim()) {
            toast.error("Password and Confirm password are not macth!");
            return false;
        }
    }
    return true;
};
