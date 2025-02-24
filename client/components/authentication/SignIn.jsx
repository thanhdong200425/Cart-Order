const SignIn = () => {
    return (
        <div className="flex min-h-screen bg-white text-white p-5">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white text-black rounded-l-3xl">
                <h1 className="text-5xl font-bold">Welcome</h1>
                <p className="text-gray-500 mt-2">We are glad to see you back with us</p>

                <div className="mt-6 w-full max-w-md">
                    <input type="text" placeholder="Username" className="w-full p-3 mb-3 border rounded-lg bg-gray-100" />
                    <input type="password" placeholder="Password" className="w-full p-3 mb-3 border rounded-lg bg-gray-100" />
                    <button className="w-full bg-black text-white py-3 rounded-lg">NEXT</button>

                    <div className="text-center mt-4 font-semibold">Login with Others</div>
                    <div className="mt-4 flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-2 border p-3 rounded-lg">
                            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                            Login with Google
                        </button>
                        <button className="flex items-center justify-center gap-2 border p-3 rounded-lg">
                            <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
                            Login with Facebook
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 flex items-center justify-center bg-orange-500 rounded-r-3xl">
                <img src="/sci-fi-image.png" alt="Sci-fi illustration" className="w-[80%] rounded-lg" />
            </div>
        </div>
    );
};

export default SignIn;
