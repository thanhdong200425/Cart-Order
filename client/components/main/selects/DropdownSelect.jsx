const DropdownSelect = ({ value, onChange, inputSets, defaultValue, placeholder }) => {
    if (!inputSets || inputSets.length === 0) return null;
    return (
        <div className="relative">
            <select value={value} onChange={onChange} className="block w-full pl-4 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm appearance-none bg-white">
                <option value="" disabled>
                    {defaultValue}
                </option>
                {inputSets &&
                    inputSets.length > 0 &&
                    inputSets.map((value, index) => (
                        <option key={index} value={value.id}>
                            {value.name}
                        </option>
                    ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            <label className="absolute left-4 -top-2 text-xs font-medium text-gray-500 bg-white px-1">{placeholder}</label>
        </div>
    );
};

export default DropdownSelect;
