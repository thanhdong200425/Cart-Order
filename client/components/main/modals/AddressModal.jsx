import { useEffect, useState } from "react";
import { AiFillShop } from "react-icons/ai";
import { FcNext } from "react-icons/fc";
import Modal from "./Modal";
import axios from "axios";
import DropdownSelect from "../selects/DropdownSelect";
import TextField from "../../inputs/TextField";
import SubmitButton from "../../buttons/SubmitButton";

const AddressModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [infoUser, setInfoUser] = useState({
        fullName: "",
        phoneNumber: "",
        gender: "male",
    });
    const [addressInfo, setAddressInfo] = useState({
        province: null,
        district: null,
        commune: null,
        address: null,
    });

    const [provinceInput, setProvinceInput] = useState("");
    const [districtInput, setDistrictInput] = useState("");
    const [communeInput, setCommuneInput] = useState("");

    // Fetch all cities
    useEffect(() => {
        getProvinces().then((result) => {
            setProvinceInput(result);
            setAddressInfo((prev) => ({ ...prev, province: result[0].id }));
        });
    }, []);

    // Fetch all districst based on specific province/city
    useEffect(() => {
        if (addressInfo.province)
            getDistricsBasedOnProvice(addressInfo.province).then((result) => {
                setDistrictInput(result);
                setAddressInfo((prev) => ({ ...prev, district: result[0].id }));
            });
    }, [addressInfo.province]);

    // Fetch all communes based on specific districts
    useEffect(() => {
        if (addressInfo.district)
            getCommunesBasedOnDistrict(addressInfo.district).then((result) => {
                setCommuneInput(result);
                setAddressInfo((prev) => ({ ...prev, commune: result && result.length > 0 ? result[0].id : null }));
            });
    }, [addressInfo.district]);

    const handleGenderChange = (e) => {
        setInfoUser((prev) => ({
            ...prev,
            gender: e.target.value,
        }));
    };

    const handleAddressChange = (e) => setAddressInfo((prev) => ({ ...prev, address: e.target.value }));
    const handleFullNameChange = (e) => setInfoUser((prev) => ({ ...prev, fullName: e.target.value }));
    const handlePhoneNumberChange = (e) => setInfoUser((prev) => ({ ...prev, phoneNumber: e.target.value }));

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
                        <TextField value={infoUser.fullName} placeholder="Your full name" onChange={handleFullNameChange} />
                        <TextField value={infoUser.phoneNumber} placeholder="Your phone number" onChange={handlePhoneNumberChange} type="tel" />

                        {/* Divider */}
                        <hr className="h-2 bg-gray-300 border-none my-5" />

                        <label className="block text-xl font-medium text-gray-700 mb-5">Delivery method</label>
                        {/* Select province/city */}
                        <DropdownSelect value={addressInfo.province} onChange={(e) => setAddressInfo((prev) => ({ ...prev, province: e.target.value }))} inputSets={provinceInput} defaultValue={"Select province/city"} placeholder={"Your city/province"} />
                        {/* Select district */}
                        <DropdownSelect value={addressInfo.district} onChange={(e) => setAddressInfo((prev) => ({ ...prev, district: e.target.value }))} inputSets={districtInput} defaultValue={"Select district"} placeholder={"Your district"} />
                        {/* Select commune */}
                        <DropdownSelect value={addressInfo.commune} onChange={(e) => setAddressInfo((prev) => ({ ...prev, commune: e.target.value }))} inputSets={communeInput} defaultValue={"Select commune"} placeholder={"Your commune"} />
                        <TextField placeholder={"Your address"} value={addressInfo.address} onChange={handleAddressChange} />

                        <SubmitButton content={"Confirm"} styles={"mt-5"} onClick={closeModal} />
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

const getDistricsBasedOnProvice = async (provinceId) => {
    try {
        const response = await axios.get(`https://open.oapi.vn/location/districts/${provinceId}`);
        return response.data.data;
    } catch (error) {
        console.log("Error in getDistrict: " + error);
        return null;
    }
};

const getCommunesBasedOnDistrict = async (districtId) => {
    try {
        const response = await axios.get(`https://open.oapi.vn/location/wards/${districtId}`);
        return response.data.data;
    } catch (error) {
        console.log("Error in getCommune: " + error);
        return null;
    }
};

export default AddressModal;
