const SubmitButton = ({ children = null, styles, content }) => {
    return <button className={`w-full bg-black text-white py-3 my-2 rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:border hover:border-black hover:shadow-md hover:cursor-pointer hover:scale-105 ${styles}`}>{children || content}</button>;
};

export default SubmitButton;
