import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MainContainer from "../../components/layouts/main/MainContainer";
import { getProductById } from "../../helper_functions/product.js";
import { toast } from "react-toastify";
import CommentSection from "../../components/main/comments/CommentSection";
import CartContext from "../../context/CartContext.jsx";

const ProductPage = () => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [productInfo, setProductInfo] = useState({});
    const { addProductToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(productId)
            .then((res) => setProductInfo(res))
            .catch((err) => toast.error(err.message));
    }, [productId]);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncreaseQuantity = () => {
        if (quantity < productInfo.stock) setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        if (productInfo && productInfo._id) addProductToCart(productInfo, quantity);
    };
    const navigateToCartPage = () => navigate("/cart");

    // If product data is loading or not found
    if (!productInfo) {
        return (
            <div className="container mx-auto px-4 py-10 flex justify-center items-center min-h-[60vh]">
                <div className="animate-pulse text-lg font-medium text-gray-700">Loading product details...</div>
            </div>
        );
    }

    return (
        <MainContainer>
            <div className="bg-gradient-to-b from-gray-50 to-white">
                {/* Product Section */}
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Product Image Gallery */}
                        <div className="space-y-6">
                            {/* Carousel part */}
                            <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                                <img src={productInfo.image} alt={productInfo.name} className="w-full h-[600px] object-cover transform transition-transform duration-500 hover:scale-105" />
                            </div>
                            <div className="grid grid-cols-5 gap-3"></div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-8 px-2">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">{productInfo.name}</h1>
                                <div className="mt-2 flex items-center">{/* Star Rating */}</div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <div className="flex items-end space-x-2">
                                    <p className="text-4xl font-bold text-gray-900">${productInfo.price}</p>
                                    <span className="text-lg text-gray-500 line-through mb-1"></span>
                                </div>
                                <p className="text-sm font-medium text-green-600 mt-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    In stock ({productInfo.stock} available)
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-100">
                                <h3 className="text-xl font-semibold text-gray-900">Description</h3>
                                <p className="mt-3 text-gray-600 leading-relaxed">{productInfo.description}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                                        <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200 focus:outline-none" onClick={handleDecreaseQuantity}>
                                            -
                                        </button>
                                        <input type="text" value={quantity} readOnly className="w-14 text-center bg-white border-none focus:outline-none font-medium" />
                                        <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200 focus:outline-none" onClick={handleIncreaseQuantity}>
                                            +
                                        </button>
                                    </div>

                                    <button className="flex-1 bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-200 transform hover:translate-y-[-2px] shadow-md hover:shadow-lg font-medium" onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>
                                </div>

                                <button onClick={navigateToCartPage} className="mt-6 w-full border-2 border-blue-600 text-blue-600 py-3 rounded-full hover:bg-blue-50 transition-all duration-200 font-medium">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <CommentSection productId={productId} />
                </div>
            </div>
        </MainContainer>
    );
};

export default ProductPage;
