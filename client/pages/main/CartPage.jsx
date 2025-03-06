import MainContainer from "../../components/layouts/main/MainContainer";
import Tab from "../../components/main/cart/Tab";
import TabList from "../../components/main/cart/TabList";

const CartPage = () => {
    return (
        <MainContainer>
            <div className="flex justify-center h-screen py-8">
                <TabList>
                    <Tab label="Delivery in place"></Tab>
                    <Tab label="Receive at shop"></Tab>
                </TabList>
            </div>
        </MainContainer>
    );
};

export default CartPage;
