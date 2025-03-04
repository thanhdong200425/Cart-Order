import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const Filter = ({ title, expanded, onToggle, options, selectedOptions, onSelectedOption }) => {
    // The second condition inside the checked attribute ensures that if the checkbox is the default option, it will be checked only if no other options are selected, preventing multiple selections from overriding the default.
    return (
        <div className="container">
            {/* Title */}
            <div className="flex items-center justify-between">
                <p className="font-bold text-sm">{title.charAt(0).toUpperCase() + title.slice(1)}</p>
                <span onClick={onToggle} className="transition-transform duration-300 transform hover:cursor-pointer ease-in">
                    {expanded ? <FaAngleUp size={"1.2rem"} /> : <FaAngleDown size={"1.2rem"} />}
                </span>
            </div>
            {/* Option */}
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${expanded ? "max-h-96" : "max-h-0"}`}>
                {options.map((option, index) => {
                    const isSelected = selectedOptions && selectedOptions.includes(option);
                    return (
                        <label key={index} className="flex items-center space-x-2 gap-1 my-2">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 rounded-md" checked={isSelected || false} onChange={() => onSelectedOption(option)} />
                            <span className="text-gray-600">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default Filter;
