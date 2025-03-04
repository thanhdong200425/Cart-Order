import { IoMdClose } from "react-icons/io";

const SelectedFilters = ({ selectedOptions, setSelectedOptions, onRemoveFilter }) => {
    if (!selectedOptions || selectedOptions.length === 0 || (selectedOptions.length === 1 && selectedOptions[0] === "all")) return null;

    const displayOptionsWithoutAll = selectedOptions.filter((option) => option !== "all");

    if (displayOptionsWithoutAll.length === 0) return null;

    return (
        <div className="container mt-4 pt-4 px-auto mx-auto flex flex-wrap gap-2">
            <button onClick={() => setSelectedOptions([])} className="text-sm text-gray-600 hover:text-red-500 border border-gray-300 hover:border-red-500 px-3 py-1 rounded-full transition-colors duration-200">
                Clear all
            </button>
            {displayOptionsWithoutAll.map((filter, index) => (
                <div key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-sm">{filter}</span>
                    <button onClick={() => onRemoveFilter(filter)} className="hover:bg-blue-200 rounded-full p-0.5">
                        <IoMdClose size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SelectedFilters;
