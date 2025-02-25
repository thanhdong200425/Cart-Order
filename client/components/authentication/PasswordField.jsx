import { useState } from "react";
import TextField from "./TextField";

const PasswordField = ({ name }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return <TextField type={"password"} placeholder={"Password"} iconPath={"/icons/lock-icon.svg"} isPassword={true} isShowPassword={isShowPassword} setIsShowPassword={() => setIsShowPassword(!isShowPassword)} name={name} />;
};

export default PasswordField;
