import { useState, useEffect } from "react";
import Filter from "./Filter";
import { SERVER_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

const FilterList = () => {
    const [filterState, setFilterState] = useState(createFilter(filters, false));
    const [selectedFilters, setSelectedFilters] = useState(createFilter(filters, []));

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const fetchedCategories = await axios.get(SERVER_URL + "/get-category");
                filters.category.data = fetchedCategories.data.categoryList;
            } catch (error) {
                console.log("Error in fetchCategory!", error);
                toast.error(error);
            }
        };

        fetchCategory();
    }, []);

    const toggleFilter = (title) => {
        setFilterState((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <div className="container flex flex-col gap-5 bg-white rounded-[5px] p-4">
            {/* Title */}
            <div className="flex items-center gap-2.5">
                <img src="/icons/filter-icon.svg" alt="Filter icon" className="w-5 h-5" />
                <h1 className="font-bold text-xl">Filter List</h1>
            </div>
            <hr />
            {/* Price option */}
            <Filter title={"Price"} expanded={filterState.price} onToggle={() => toggleFilter("price")} options={filters.price.data} defaultOptionIndex={filters.price.default} />
            <Filter title={"Category"} expanded={filterState.category} onToggle={() => toggleFilter("category")} options={filters.category.data} defaultOptionIndex={filters.category.default} />
        </div>
    );
};

const filters = {
    price: {
        data: ["all", "below $200", "from $200 to $400", "from $400 to $800", "from $800 to $2000", "above $2000"],
        default: 1,
    },
    category: {
        data: [],
        default: 0,
    },
};

const createFilter = (filters, defaultValue) => {
    const initialFilter = {};
    for (const key in filters) initialFilter[key] = defaultValue;
    return initialFilter;
};

export default FilterList;
