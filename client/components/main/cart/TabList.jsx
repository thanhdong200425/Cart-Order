import { Children, useState } from "react";

const TabList = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);
    const childrenArray = Children.toArray(children);

    return (
        <div className="flex flex-col">
            {/* Tab Headers */}
            <div className="flex border border-gray-200 rounded-xl">
                {childrenArray.map((child, index) => (
                    <button key={index} className={`px-32 py-2 focus:outline-none font-medium transition-all duration-200 rounded bg-gray-200 ${activeTab === index ? "bg-white text-blue-600 border-t-2 border-r border-l border-blue-500" : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`} onClick={() => setActiveTab(index)}>
                        {child.props.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            {childrenArray.map(
                (child, index) =>
                    index === activeTab && (
                        <div key={index} className="bg-white p-4">
                            {child}
                        </div>
                    )
            )}
        </div>
    );
};

export default TabList;
