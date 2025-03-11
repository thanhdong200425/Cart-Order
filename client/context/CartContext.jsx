import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.log("Error in effect to load cart items: " + error);
            }
        }
    }, []);

    // Effect to update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart function
    const addProductToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === product._id);
            if (existingItem) {
                toast.info(`Increased ${product.name} quantity in cart by 1`, {
                    toastId: `increase-${product._id}-${Date.now()}`,
                });
                return prevItems.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
            } else {
                toast.success(`Added ${product.name} into cart`, {
                    toastId: `add-${product._id}-${Date.now()}`,
                });
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Toggle item quantity
    const toggleQuantity = (productId, type = "increase") => {
        if (type === "increase") return setCartItems((prevItems) => prevItems.map((item) => (item._id === productId ? { ...item, quantity: item.quantity + 1 } : item)));

        return setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === productId);

            // If current quantity of a product = 1 => remove it from cart
            if (existingItem && existingItem.quantity === 1) {
                toast.info(`Remove ${existingItem.name} from cart`, {
                    toastId: `remove-${productId}-${Date.now()}`,
                });
                return prevItems.filter((item) => item._id !== productId);
            }

            // Decrease quantity
            return prevItems.map((item) => (item._id === productId ? { ...item, quantity: item.quantity - 1 } : item));
        });
    };

    const clearCart = () => {
        toast.info("Cart cleared", {
            toastId: Date.now(),
        });
        setCartItems([]);
    };

    const getQuantityItemInCart = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);

    const getTotalPriceInCart = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

    const exportValue = { cartItems, addProductToCart, toggleQuantity, clearCart, getQuantityItemInCart, getTotalPriceInCart };

    return <CartContext.Provider value={exportValue}>{children}</CartContext.Provider>;
};

export default CartContext;
