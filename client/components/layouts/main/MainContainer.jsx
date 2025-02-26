import NavigationBar from "../../main/NavigationBar";
import ProductList from "../../main/ProductList";

const MainContainer = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavigationBar />
            <ProductList />
        </div>
    );
};

export default MainContainer;
