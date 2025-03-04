import Filter from "./Filter";

const FilterList = ({ filters, filterStates, onToggleFilter, selectedOptions, onSelectOption }) => {
    return (
        <div className="container flex flex-col gap-5 bg-white rounded-[5px] p-4">
            {/* Title */}
            <div className="flex items-center gap-2.5">
                <img src="/icons/filter-icon.svg" alt="Filter icon" className="w-5 h-5" />
                <h1 className="font-bold text-xl">Filter List</h1>
            </div>
            <hr />
            {/* Price option */}
            {filters && filters.map((filter, index) => <Filter key={index} title={filter.name} expanded={filterStates[filter.name]} options={filter.data} onToggle={() => onToggleFilter(filter.name)} selectedOptions={selectedOptions} onSelectedOption={onSelectOption} />)}
        </div>
    );
};

export default FilterList;
