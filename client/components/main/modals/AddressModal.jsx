import { useEffect, useState } from "react";
import { AiFillShop } from "react-icons/ai";
import { FcNext } from "react-icons/fc";
import Modal from "./Modal";
import axios from "axios";

const AddressModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [infoUser, setInfoUser] = useState({
        fullName: "",
        phoneNumber: "",
        gender: "male",
    });
    const [addressInfo, setAddressInfo] = useState({
        province: "",
        district: "",
        commune: "",
        address: "",
    });

    const [provinceInput, setProvinceInput] = useState([]);
    const [districtInput, setDistrictInput] = useState([]);
    const [communeInput, setCommuneInput] = useState([]);

    useEffect(() => {
        getProvinces().then((result) => setProvinceInput(result));
    }, []);

    const handleGenderChange = (e) => {
        setInfoUser((prev) => ({
            ...prev,
            gender: e.target.value,
        }));
    };

    const genderList = ["male", "female"];

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);
    return (
        <>
            <div className="flex justify-between border border-blue-300 items-centerborder-blue-300 rounded-xl p-2 hover:cursor-pointer" onClick={openModal}>
                <p className="flex items-center gap-2 text-sm text-blue-500">
                    <span>
                        <AiFillShop size={15} color="red" />
                    </span>
                    Please provide address to receive order
                </p>
                <button>
                    <FcNext size={15} />
                </button>
            </div>
            <Modal isOpen={isOpenModal} onClose={closeModal} title={"Delivery Address"}>
                <form className="space-y-4 p-4">
                    <div className="space-y-5">
                        <label className="block text-xl font-medium text-gray-700 mb-5">Orderer information</label>
                        {/* Gender field */}
                        <div className="flex gap-6">
                            {genderList.map((gen, index) => (
                                <div className="flex items-center" key={index}>
                                    <input id={`gender-${gen}`} type="radio" value={gen} name="gender" checked={gen === infoUser.gender} onChange={handleGenderChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                    <label htmlFor={`gender-${gen}`} className="ml-2 text-sm">
                                        {gen.charAt(0).toUpperCase() + gen.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Other input fields */}
                        <input type="text" placeholder="Full name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={infoUser.fullName} />
                        <input type="tel" placeholder="Phone number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={infoUser.phoneNumber} />

                        {/* Divider */}
                        <hr className="h-2 bg-gray-300 border-none my-5" />

                        <label className="block text-xl font-medium text-gray-700 mb-5">Delivery method</label>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Province/City</label>
                            <div className="relative">
                                <select value={addressInfo.province} onChange={(e) => setAddressInfo((prev) => ({ ...prev, province: e.target.value }))} className="block w-full pl-4 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm appearance-none bg-white">
                                    <option value="" disabled>
                                        Select province/city
                                    </option>
                                    {provinceInput.map((province, index) => (
                                        <option key={index} value={province.slug}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom arrow icon */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

const getProvinces = async () => {
    try {
        const response = await axios.get("https://open.oapi.vn/location/provinces?size=63");
        return response.data.data;
    } catch (error) {
        console.log("Error when get provinces: " + error);
        return;
    }
};

export default AddressModal;
