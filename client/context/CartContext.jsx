import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext.jsx";
import axios from "axios";
import { SERVER_URL } from "../config.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user, isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
        const loadCart = async () => {
            if (isAuthenticated && user?._id) {
                try {
                    const response = await axios.get(`${SERVER_URL}/user/cart`, {
                        headers: {
                            Authorization: `Bearer ${user?._id}`,
                        },
                    });
                    if (response.status === 200) {
                        const cartData = response.data.cart || [];
                        if (cartData?.length === 0) setCartItems(JSON.parse(localStorage.getItem("cartItems")));
                        else setCartItems(Array.isArray(cartData) ? cartData : []);
                    }
                } catch (e) {
                    console.log("Error in load cart cart", e);
                    setCartItems([]);
                }
            } else {
                const storedCart = localStorage.getItem("cartItems");
                try {
                    setCartItems(storedCart ? JSON.parse(storedCart) : []);
                } catch (e) {
                    console.log("Error in load cart cart", e);
                    setCartItems([]);
                }
            }
        };

        loadCart();
    }, [isAuthenticated, user]);

    // Effect to update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        if (isAuthenticated && user?._id && cartItems?.length > 0) {
            const saveCartToServer = async () => {
                try {
                    await axios.post(
                        `${SERVER_URL}/user/cart`,
                        {
                            cart: cartItems,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${user?._id}`,
                            },
                        }
                    );
                } catch (e) {
                    console.log("Error in save cart to server", e);
                    toast.error("Failed to save cart");
                }
            };
            saveCartToServer();
        }
    }, [cartItems, isAuthenticated, user?._id]);

    // Add product to cart function
    const addProductToCart = (product, quantity = 1) => {
        if (cartItems?.length === 0) {
            setCartItems([{ ...product, quantity: quantity }]);
            return;
        }
        setCartItems((prevItems) => {
            const existingItem = prevItems?.find((item) => item._id === product._id);
            if (existingItem) {
                toast.info(`Increased ${product.name} quantity in cart by 1`, {
                    toastId: `increase-${product._id}`,
                });
                return prevItems.map((item) =>
                    item._id === product._id
                        ? {
                              ...item,
                              quantity: item.quantity + quantity,
                          }
                        : item
                );
            } else {
                toast.success(`Added ${product.name} into cart`, {
                    toastId: `add-${product._id}`,
                });
                return [...prevItems, { ...product, quantity: quantity }];
            }
        });
    };

    // Toggle item quantity
    const toggleQuantity = (productId, type = "increase") => {
        if (type === "increase")
            return setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === productId
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                )
            );

        return setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === productId);

            // If current quantity of a product = 1 => remove it from cart
            if (existingItem && existingItem.quantity === 1) {
                toast.info(`Removed ${existingItem.name} from cart`, {
                    toastId: `remove-${productId}`,
                });
                return prevItems.filter((item) => item._id !== productId);
            }

            // Decrease quantity
            return prevItems.map((item) => (item._id === productId ? { ...item, quantity: item.quantity - 1 } : item));
        });
    };

    const clearCart = () => {
        toast.info("Cart cleared", {
            toastId: "clear-cart",
        });
        setCartItems([]);
    };

    const getQuantityItemInCart = useMemo(() => {
        if (!Array.isArray(cartItems) || cartItems.length === 0) return 0;
        return cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);
    }, [cartItems]);

    const getTotalPriceInCart = useMemo(() => {
        if (!Array.isArray(cartItems) || cartItems.length === 0) return 0;
        return cartItems.reduce((total, item) => total + (item?.price || 0) * (item?.quantity || 0), 0);
    }, [cartItems]);

    const exportValue = {
        cartItems,
        addProductToCart,
        toggleQuantity,
        clearCart,
        getQuantityItemInCart,
        getTotalPriceInCart,
    };

    return <CartContext.Provider value={exportValue}>{children}</CartContext.Provider>;
};

export default CartContext;
