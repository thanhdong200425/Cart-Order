import { useContext, useState } from "react";
import { FiSearch, FiShoppingCart, FiChevronDown, FiUser } from "react-icons/fi";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { getQuantityItemInCart } = useContext(CartContext);
    const cartCount = getQuantityItemInCart || 0;

    // Sample categories - replace with your actual categories
    const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty", "Books"];

    return (
        <nav className="bg-white shadow-md py-2 px-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.jpg" alt="Store Logo" className="h-[5rem] w-full mr-2 transform transition-transform ease-in duration-200 hover:scale-120" />
                        </Link>
                    </div>

                    {/* Categories and Search */}
                    <div className="flex-grow flex justify-center items-center mx-4">
                        <div className="flex items-center w-full max-w-2xl">
                            {/* Categories Dropdown */}
                            <div className="relative mr-3">
                                <button className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none hover:cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <span className="mr-1">Categories</span>
                                    <FiChevronDown className={`transition-transform ease-in duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        {categories.map((category, index) => (
                                            <a key={index} href={`/category/${category.toLowerCase().replace(/ /g, "-")}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                {category}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Search Bar */}
                            <div className="flex-grow">
                                <div className="relative">
                                    <input type="text" placeholder="Search for products..." className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FiSearch className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4 flex-shrink-0">
                        {/* Profile/Avatar */}
                        <div className="relative">
                            <button className="flex items-center focus:outline-none hover:cursor-pointer transform" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FiUser className="text-gray-600" />
                                </div>
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        My Profile
                                    </a>
                                    <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        My Orders
                                    </a>
                                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </a>
                                    <div className="border-t border-gray-100"></div>
                                    <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Cart Button */}
                        <Link to="/cart" className="relative p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <FiShoppingCart className="text-xl text-gray-700" />
                            {cartCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
