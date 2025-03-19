import MainContainer from "../../components/layouts/main/MainContainer";
import CartList from "../../components/main/cart/CartList";
import CheckoutContainer from "../../components/main/cart/CheckoutContainer";
import Tab from "../../components/main/cart/Tab";
import TabList from "../../components/main/cart/TabList";
import { useContext } from "react";
import CartContext from "../../context/CartContext.jsx";

const CartPage = () => {
    const { cartItems, toggleQuantity } = useContext(CartContext);

    const handleIncreaseQuantity = (itemId) => toggleQuantity(itemId);

    const handleDecreaseQuantity = (itemId) => toggleQuantity(itemId, "decrease");

    return (
        <MainContainer>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your Shopping Cart</h1>
                    <p className="mt-2 text-sm text-gray-500">Review your items, choose your payment, and complete your purchase</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-4">
                    <TabList>
                        <Tab label="Delivery in place">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-6">
                                <div className="lg:col-span-2">
                                    <CartList items={cartItems || []} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} />{" "}
                                </div>
                                <div className="lg:col-span-1">
                                    <div className="sticky top-24">{cartItems.length > 0 && <CheckoutContainer />}</div>
                                </div>
                            </div>
                        </Tab>
                        <Tab label="Receive at shop">
                            <div className="h-64 flex items-center justify-center text-gray-500">
                                <p>Select your preferred store for pickup</p>
                            </div>
                        </Tab>
                    </TabList>
                </div>

                <div className="mt-10">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">Shipping Information</h3>
                                <div className="mt-1 text-sm text-blue-700">
                                    <p>Free shipping on all orders over $100. Expected delivery: 3-5 business days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default CartPage;
