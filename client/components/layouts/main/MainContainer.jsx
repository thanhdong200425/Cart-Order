import NavigationBar from "../../main/NavigationBar";

const MainContainer = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavigationBar />
            {children}
        </div>
    );
};

export default MainContainer;
