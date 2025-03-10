import AddressModal from "../modals/AddressModal";

const Tab = ({ children }) => {
    return (
        <div className="animate-fadeIn">
            <div className="mb-6 mt-4">
                <AddressModal />
            </div>
            {children}
        </div>
    );
};

export default Tab;
