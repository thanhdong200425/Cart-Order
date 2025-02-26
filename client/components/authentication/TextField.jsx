const TextField = ({ type, name, inputValue, setInputValue, placeholder, iconPath, isPassword, isShowPassword, setIsShowPassword, onFocus, onBlur }) => {
    return (
        <div className="relative shadow-xs">
            <input type={isShowPassword ? "text" : type} placeholder={placeholder} className="w-full p-3 pl-12 mb-3 rounded-lg bg-gray-100" name={name} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onFocus={onFocus} onBlur={onBlur} />
            <img src={iconPath} alt="icon" className="absolute left-4 top-3.5 transform h-5 w-5" />
            {isPassword && <img src={`/icons/${isShowPassword ? "hide" : "show"}-icon.svg`} className="absolute right-4 top-3.5 transform h-5 w-5 hover:cursor-pointer" onClick={setIsShowPassword} />}
        </div>
    );
};

export default TextField;
