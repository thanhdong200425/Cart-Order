const CheckoutOption = ({ id, title, description, icon, selected, onSelect }) => {
    return (
        <div className={`flex items-center p-4 mb-3 border rounded-lg cursor-pointer transition-all duration-200 ${selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`} onClick={() => onSelect(id)}>
            <div className="flex justify-center items-center w-12 h-10 rounded-full bg-white mr-2 shadow-sm">{icon}</div>
            <div className="flex-grow">
                <h3 className="font-medium text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="ml-2">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? "border-blue-500" : "border-gray-300"}`}>{selected && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}</div>
            </div>
        </div>
    );
};

export default CheckoutOption;
