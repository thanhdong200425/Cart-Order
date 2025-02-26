import { useState } from "react";
import TextField from "./TextField";

const PasswordField = ({ name, inputValue, setInputValue }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return <TextField type={"password"} inputValue={inputValue} setInputValue={setInputValue} placeholder={"Password"} iconPath={"/icons/lock-icon.svg"} isPassword={true} isShowPassword={isShowPassword} setIsShowPassword={() => setIsShowPassword(!isShowPassword)} name={name} />;
};

export default PasswordField;
