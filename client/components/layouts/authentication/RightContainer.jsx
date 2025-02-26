const RightContainer = ({ imgPath }) => {
    return (
        <div className="w-1/2 flex items-center justify-center rounded-3xl">
            <img src={imgPath} alt="Sci-fi illustration" className="w-[100%] rounded-3xl" />
        </div>
    );
};

export default RightContainer;
