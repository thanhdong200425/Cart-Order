import { Children, useState } from "react";

const TabList = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);
    const childrenArray = Children.toArray(children);

    return (
        <div className="flex flex-col">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
                {childrenArray.map((child, index) => (
                    <button
                        key={index}
                        className={`
                            px-8 py-4 font-medium text-base transition-all duration-200 focus:outline-none relative
                            ${activeTab === index ? "text-blue-600" : "text-gray-500 hover:text-gray-700"}
                        `}
                        onClick={() => setActiveTab(index)}
                    >
                        {child.props.label}
                        {activeTab === index && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transform translate-y-0.5"></span>}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            {childrenArray.map((child, index) => (
                <div key={index} className={`transition-opacity duration-300 ${index === activeTab ? "opacity-100" : "hidden opacity-0"}`}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default TabList;
