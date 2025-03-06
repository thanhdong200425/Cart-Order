import AddressModal from "../modals/AddressModal";

const Tab = ({ children }) => {
    return (
        <div>
            <AddressModal />
            {children}
        </div>
    );
};

export default Tab;
