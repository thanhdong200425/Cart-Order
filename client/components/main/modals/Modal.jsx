import { useEffect } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Outside container */}
            <div className="absolute inset-0 bg-gray-300 bg-opacity-50" onClick={onClose}></div>
            {/* Inside container */}
            <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-md mx-4">
                {/* Header part */}
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <MdClose size={20} />
                    </button>
                </div>
                {/* Content part */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
