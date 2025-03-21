import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const { addProductToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleShippingButton = (e) => {
        e.preventDefault();
        addProductToCart(product);
    };
    const navigateToPageShowProduct = () => navigate(`/product/${product._id}`);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden" onClick={navigateToPageShowProduct}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 hover:cursor-pointer" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate hover:cursor-pointer" onClick={navigateToPageShowProduct}>
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-black">${product.price}</span>
                    <button className="bg-black text-white p-2 rounded-full hover:cursor-pointer hover:bg-indigo-700 transition-colors duration-300" aria-label="Add to cart" onClick={handleShippingButton}>
                        <FaShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
