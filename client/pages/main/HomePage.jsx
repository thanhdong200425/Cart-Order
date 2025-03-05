import { useState, useEffect } from "react";
import MainContainer from "../../components/layouts/main/MainContainer";
import ProductList from "../../components/main/ProductList";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { toast } from "react-toastify";
import FilterList from "../../components/main/FilterList";
import SelectedFilters from "../../components/main/SelectedFilters";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalProducts, setTotalProducts] = useState(0);
    const [filters, setFilter] = useState(filtersList);
    const [filterState, setFilterState] = useState(
        filtersList.reduce((acc, filter) => {
            acc[filter.name] = false;
            return acc;
        }, {})
    );
    const [selectedOptions, setSelectedOptions] = useState(["all"]);
    const [selectedSortOption, setSelectedSortOption] = useState("price-lowest");
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                let sortField = "price";
                let sortOrder = "lowest";

                if (selectedSortOption) {
                    const [field, order] = selectedSortOption.split("-");
                    sortField = field;
                    sortOrder = order;
                }

                const queryParams = new URLSearchParams();
                queryParams.append("sortField", sortField);
                queryParams.append("sortOrder", sortOrder);

                selectedOptions.forEach((option) => {
                    if (option === "all") return;

                    if (filters.find((f) => f.name === "category")?.data.includes(option)) queryParams.append("category", option);
                    else if (filters.find((f) => f.name === "price")?.data.includes(option)) queryParams.append("price", option);
                });

                const response = await axios.get(`${SERVER_URL}/?${queryParams.toString()}`);
                setProducts(response.data.productList);
                setLoading(false);
                setTotalProducts(response.data.totalProducts);
            } catch (error) {
                console.log("Error in fetchProducts: " + error);
                if (error.response.status === 500) toast.error("Sorry, we encountered a problem!");
                else toast.error(error.response.data.error);
                return;
            }
        };
        fetchProducts();
    }, [selectedSortOption, selectedOptions, filters]);

    const toggleFilter = (filterName) => {
        setFilterState((prev) => ({
            ...prev,
            [filterName]: !prev[filterName],
        }));
    };

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

    const handleSortChange = (e) => setSelectedSortOption(e.target.value);

    return (
        <MainContainer>
            <div className="flex">
                <div className="w-64 shrink-0 mr-3 py-8 pl-6">
                    <FilterList filters={filters} filterStates={filterState} onToggleFilter={toggleFilter} selectedOptions={selectedOptions} onSelectOption={handleSelectOption} />
                </div>
                <div className="flex-grow">
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
                    <SelectedFilters selectedOptions={selectedOptions} onRemoveFilter={handleSelectOption} setSelectedOptions={setSelectedOptions} />
                    <ProductList products={products} loading={loading} />
                </div>
            </div>
        </MainContainer>
    );
};

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
