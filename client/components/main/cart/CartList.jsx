import CartContext from "../../../context/CartContext";
import CartItem from "./CartItem";
import { useContext } from "react";

const CartList = ({ items, onIncreaseQuantity, onDecreaseQuantity }) => {
    const { getTotalPriceInCart } = useContext(CartContext);
    const totalPrice = getTotalPriceInCart;

    return (
        <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Your Items ({items.length})</h2>
            </div>

            <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
                {items && items.length > 0 ? (
                    items.map((item) => <CartItem key={item._id} item={item} onIncreaseQuantity={onIncreaseQuantity} onDecreaseQuantity={onDecreaseQuantity} />)
                ) : (
                    <div className="p-12 text-center">
                        <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
                            <svg className="h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">Your cart is empty</p>
                        <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
                    </div>
                )}
            </div>

            {items && items.length > 0 && (
                <div className="p-5 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between items-center mb-6 pt-3 border-t border-gray-200">
                        <span className="font-bold text-gray-800">Total</span>
                        <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartList;
