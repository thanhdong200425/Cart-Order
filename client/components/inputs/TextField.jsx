import { useState } from "react";

const TextField = ({ placeholder = "", value, onChange, type = "text", name, id, required = false, className = "", pattern }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = () => setIsFocused(false);

    return (
        <div className={`relative mb-4 ${className}`}>
            <input type={type} name={name} id={id} value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} required={required} pattern={pattern} className="w-full px-3 py-3 text-gray-800 border rounded-md outline-none transition-all duration-200 bg-white border-gray-300 focus:border-blue-500 peer" />
            <label
                className={`absolute text-gray-500 duration-300 transform-translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1
                ${isFocused || (value && value.length > 0) ? "top-2 -translate-y-4 scale-75 text-blue-600 z-10 px-2" : "top-1/2 -translate-y-1/2 scale-100"}`}
            >
                {placeholder}
            </label>
        </div>
    );
};

export default TextField;
