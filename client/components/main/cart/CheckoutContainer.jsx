import { useState } from "react";
import CheckoutOption from "./CheckoutOption";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

const paymentOptions = [
    {
        id: "cash",
        title: "Pay when receiving goods",
        description: "Pay with cash upon delivery",
        icon: <FaMoneyBillWave className="text-green-500 text-xl" />,
    },
    {
        id: "momo",
        title: "Pay with MoMo",
        description: "Fast and secure payment with MoMo e-wallet",
        icon: <FaCreditCard className="text-pink-500 text-xl" />,
    },
    {
        id: "vnpay",
        title: "Pay with VNPay",
        description: "Quick payment via VNPay gateway",
        icon: <FaCreditCard className="text-blue-500 text-xl" />,
    },
    {
        id: "stripe",
        title: "Pay with Stripe",
        description: "Secure international payment via Stripe",
        icon: <FaCreditCard className="text-purple-500 text-xl" />,
    },
];

const CheckoutContainer = () => {
    const [selectedPayment, setSelectedPayment] = useState("cash");

    const handlePaymentSelect = (id) => {
        setSelectedPayment(id);
    };

    const handleCheckout = () => {
        console.log(`Processing checkout with ${selectedPayment} payment method`);
        // Add checkout logic based on selected payment
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>

            <div className="mb-6">
                {paymentOptions.map((option) => (
                    <CheckoutOption key={option.id} id={option.id} title={option.title} description={option.description} icon={option.icon} selected={selectedPayment === option.id} onSelect={handlePaymentSelect} />
                ))}
            </div>

            <div className="border-t pt-4">
                <button onClick={handleCheckout} className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center">
                    <span className="mr-2">Proceed to Payment</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CheckoutContainer;
