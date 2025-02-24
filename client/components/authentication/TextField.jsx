const TextField = ({ type, placeholder, iconPath, isPassword }) => {
    return (
        <div className="relative shadow-xs">
            <input type={type} placeholder={placeholder} className="w-full p-3 pl-12 mb-3 rounded-lg bg-gray-100" />
            <img src={iconPath} alt="icon" className="absolute left-4 top-3.5 transform h-5 w-5" />
            {isPassword && <img src="/icons/show-icon.svg" className="absolute right-4 top-3.5 transform h-5 w-5 hover:cursor-pointer" />}
        </div>
    );
};

export default TextField;
