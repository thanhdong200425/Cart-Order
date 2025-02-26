import ThirdPartyButton from "../../buttons/ThirdPartyButton";

const LeftContainer = ({ title, subTitle, children, alternativeMode }) => {
    return (
        <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white text-black rounded-l-3xl">
            <h1 className="text-[4rem] font-bold">{title}</h1>
            <p className="text-gray-500 mt-2">{subTitle}</p>

            <div className="mt-6 w-full max-w-md">
                {children}

                <div className="text-center mt-4 font-semibold">Login with Others</div>
                <div className="mt-4 flex flex-col gap-3">
                    <ThirdPartyButton styles={"bg-white !text-black flex items-center justify-center gap-2 shadow-xl border border-stone-300 "}>
                        <img src="/icons/google-icon.svg" alt="Google" className="w-5 h-5" />
                        Login with Google
                    </ThirdPartyButton>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {/* Toggle Link */}
                <div className="text-center">
                    <a href={`/${alternativeMode}`} className="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 underline-offset-2 hover:underline">
                        {alternativeMode === "sign-in" ? "Create an account" : "Already have an account? Sign in"}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LeftContainer;
