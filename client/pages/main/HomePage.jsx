import { useState, useEffect, useRef } from "react";
import MainContainer from "../../components/layouts/main/MainContainer";
import ProductList from "../../components/main/ProductList";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { toast } from "react-toastify";
import FilterList from "../../components/main/FilterList";
import SelectedFilters from "../../components/main/SelectedFilters";

// Main homepage component that handles product listing with filtering and sorting
const HomePage = () => {
    // Ref for storing scroll position when loading more products
    const scrollPositionRef = useRef(0);

    // UI state
    const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Product data state
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [showedProducts, setShowedProducts] = useState(0);

    // Pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [hasMore, setHasMore] = useState(true);

    // Filter and sort state
    const [filters, setFilter] = useState(filtersList);
    const [filterState, setFilterState] = useState(
        filtersList.reduce((acc, filter) => {
            acc[filter.name] = false;
            return acc;
        }, {})
    );
    const [selectedOptions, setSelectedOptions] = useState(["all"]);
    const [selectedSortOption, setSelectedSortOption] = useState("price-lowest");

    // Available sorting options
    const sortList = [
        {
            name: "price",
            type: ["lowest", "highest"],
        },
        {
            name: "name",
            type: ["lowest", "highest"],
        },
    ];

    // Show/hide scroll-to-top button based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrollToTopVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        // Only run whenever the component is unmounted
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const fetchedCategories = await axios.get(SERVER_URL + "/get-category");
                setFilter((prev) => {
                    const updatedFilters = prev.map((filter) => {
                        if (filter.name === "category")
                            return {
                                ...filter,
                                data: ["all", ...fetchedCategories.data.categoryList],
                            };
                        return filter;
                    });
                    return updatedFilters;
                });
            } catch (error) {
                console.log("Error in fetchCategory!", error);
                toast.error(error);
            }
        };

        fetchCategory();
    }, []);

    // Fetch products based on filters, sorting, and pagination
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                // Parse sort option into field and order
                let sortField = "price";
                let sortOrder = "lowest";

                if (selectedSortOption) {
                    const [field, order] = selectedSortOption.split("-");
                    sortField = field;
                    sortOrder = order;
                }

                // Build query parameters
                const queryParams = new URLSearchParams();
                queryParams.append("sortField", sortField);
                queryParams.append("sortOrder", sortOrder);
                queryParams.append("page", page);
                queryParams.append("limit", limit);

                // Add selected filter options to query
                selectedOptions.forEach((option) => {
                    if (option === "all") return;

                    if (filters.find((f) => f.name === "category")?.data.includes(option)) queryParams.append("category", option);
                    else if (filters.find((f) => f.name === "price")?.data.includes(option)) queryParams.append("price", option);
                });

                // Fetch products with filters
                const response = await axios.get(`${SERVER_URL}/?${queryParams.toString()}`);

                // Handle pagination - replace or append products
                const newProducts = page === 1 ? response.data.productList : [...products, ...response.data.productList];

                // Update state with fetched data
                setProducts(newProducts);
                setLoading(false);
                setTotalProducts(response.data.totalProducts);
                setShowedProducts(newProducts.length);
                setHasMore(response.data.productList.length >= limit);
            } catch (error) {
                console.log("Error in fetchProducts: " + error);
                if (error.response.status === 500) toast.error("Sorry, we encountered a problem!");
                else toast.error(error.response.data.error);
                return;
            }
        };
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSortOption, selectedOptions, filters, page, limit]);

    // Restore scroll position after loading more products
    useEffect(() => {
        if (page > 1 && !loading) setTimeout(() => window.scrollTo(0, scrollPositionRef.current), 0);
    }, [page, loading]);

    // Reset to first page when filters or sort options change
    useEffect(() => setPage(1), [selectedOptions, selectedSortOption]);

    // Load more products and save current scroll position
    const loadMoreProducts = () => {
        scrollPositionRef.current = window.scrollY;
        setPage((prev) => prev + 1);
    };

    // Toggle filter visibility
    const toggleFilter = (filterName) => {
        setFilterState((prev) => ({
            ...prev,
            [filterName]: !prev[filterName],
        }));
    };

    // Handle filter option selection
    const handleSelectOption = (option) => {
        if (option === "all") {
            setSelectedOptions(["all"]);
            return;
        }
        setSelectedOptions((prev) => {
            if (prev.includes("all")) return [option];
            if (prev.includes(option)) {
                const newOptions = prev.filter((opt) => opt !== option);
                return newOptions.length === 0 ? ["all"] : newOptions;
            }
            return [...prev, option];
        });
    };

    // Handle sort option change
    const handleSortChange = (e) => setSelectedSortOption(e.target.value);

    // Scroll to top of page with smooth animation
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <MainContainer>
            <div className="flex">
                {/* Sidebar with filters */}
                <div className="w-64 shrink-0 mr-3 py-8 pl-6 sticky top-20 self-start max-h-screen overflow-y-auto">
                    <FilterList filters={filters} filterStates={filterState} onToggleFilter={toggleFilter} selectedOptions={selectedOptions} onSelectOption={handleSelectOption} />
                </div>

                {/* Main content area */}
                <div className="flex-grow">
                    {/* Sort controls and result count */}
                    <div className="container mt-4 pt-4 px-4 mx-auto flex justify-between items-center flex-wrap gap-2">
                        <p>Found {totalProducts} results</p>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700 font-medium">Sort by</span>
                            <select className="p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" value={selectedSortOption} onChange={handleSortChange}>
                                {sortList.flatMap((option) => {
                                    return option.type.map((subType, index) => (
                                        <option key={`${option.name}-${subType}-${index}`} value={`${option.name}-${subType}`}>
                                            {subType.charAt(0).toUpperCase() + subType.slice(1)} by {option.name}
                                        </option>
                                    ));
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Selected filters display */}
                    <SelectedFilters selectedOptions={selectedOptions} onRemoveFilter={handleSelectOption} setSelectedOptions={setSelectedOptions} />

                    {/* Product grid */}
                    <ProductList products={products} loading={loading} />

                    {/* Load more button */}
                    {hasMore && showedProducts < totalProducts && (
                        <div className="flex justify-center my-8">
                            <button
                                onClick={loadMoreProducts}
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                                           transition duration-300 disabled:bg-blue-300"
                            >
                                {loading ? "Loading..." : `Load ${totalProducts - showedProducts} more products`}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll to top button */}
            <button
                onClick={scrollToTop}
                className={`fixed right-8 bottom-8 p-3 rounded-full bg-blue-600 text-white shadow-lg
                           hover:bg-blue-700 transition-all duration-300 z-50 hover:cursor-pointer
                           ${scrollToTopVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
            </button>
        </MainContainer>
    );
};

// Default filter configurations
const filtersList = [
    {
        name: "price",
        data: ["all", "below $200", "from $200 to $400", "from $400 to $800", "from $800 to $2000", "above $2000"],
        default: 0,
    },
    {
        name: "category",
        data: ["all"],
        default: 0,
    },
];

export default HomePage;
