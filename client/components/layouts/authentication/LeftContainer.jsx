import ThirdPartyButton from "../../buttons/ThirdPartyButton";

const LeftContainer = ({ title, subTitle, children }) => {
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
            </div>
        </div>
    );
};

export default LeftContainer;
