import { useEffect, useState } from "react";
import Product from "./Product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { toast } from "react-toastify";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [sortBy, setSortBy] = useState("name");
    const [loading, setLoading] = useState(false);
    const productsPerPage = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(SERVER_URL + "/", {
                    params: {
                        page: currentPage,
                    },
                });
                setProducts(response.data.productList);
                setTotalPages(response.data.totalPages);
                setTotalProducts(response.data.totalProductsInDB);
                setLoading(false);
            } catch (error) {
                console.log("Error in fetchProducts: " + error);
                if (error.response.status === 500) toast.error("Sorry, we encountered a problem!");
                else toast.error(error.response.data.error);
                return;
            }
        };
        fetchProducts();
    }, [currentPage]);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Shop Products</h1>
                <div className="flex items-center">
                    <label className="mr-2 text-gray-700">Sort by:</label>
                    <select className="border rounded-md p-2 bg-white" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-15 w-15 border-t-2 border-b-2 border-indigo-600"></div>
                    <p className="mt-2 text-3xl text-gray-600">Loading products...</p>
                </div>
            ) : (
                <>
                    {/* Product list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center items-center">
                        <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} disabled={currentPage === 1} className={`mx-2 p-2 rounded-md ${currentPage === 1 ? "text-gray-600 cursor-not-allowed" : "text-blue-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer"}`}>
                            <FaChevronLeft />
                        </button>
                        {Array(totalPages)
                            .fill()
                            .map((_, index) => {
                                const pageNumber = index + 1;
                                if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1))
                                    return (
                                        <button key={index} onClick={() => paginate(pageNumber)} className={`mx-1 py-1 px-3 rounded-md cursor-pointer ${pageNumber === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-blue-500 hover:text-white"}`}>
                                            {pageNumber}
                                        </button>
                                    );
                                if ((index === 1 && currentPage > 3) || (index === totalPages - 2 && currentPage < totalPages - 2))
                                    return (
                                        <span key={index} className="mx-1">
                                            ...
                                        </span>
                                    );
                                return null;
                            })}
                        <button onClick={() => currentPage < totalPages && paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`mx-1 p-2 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer"}`}>
                            <FaChevronRight />
                        </button>
                    </div>
                    <div className="text-center text-gray-600 mt-4">
                        Showing {(currentPage - 1) * productsPerPage + 1} - {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
