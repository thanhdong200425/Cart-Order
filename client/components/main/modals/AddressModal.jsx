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
        province: { id: "", name: null },
        district: { id: "", name: null },
        commune: { id: "", name: null },
        address: "",
    });

    const [provinceInput, setProvinceInput] = useState("");
    const [districtInput, setDistrictInput] = useState("");
    const [communeInput, setCommuneInput] = useState("");

    // Fetch all cities
    useEffect(() => {
        getProvinces().then((result) => {
            setProvinceInput(result);
            setAddressInfo((prev) => ({
                ...prev,
                province: {
                    id: result[0].id,
                    name: result[0].name,
                },
            }));
        });
    }, []);

    // Fetch all districst based on specific province/city
    useEffect(() => {
        if (addressInfo.province.id && addressInfo.province.name)
            getDistricsBasedOnProvice(addressInfo.province.id).then((result) => {
                setDistrictInput(result);
                setAddressInfo((prev) => ({
                    ...prev,
                    district: {
                        id: result[0].id,
                        name: result[0].name,
                    },
                }));
            });
    }, [addressInfo.province]);

    // Fetch all communes based on specific districts
    useEffect(() => {
        if (addressInfo.district.id && addressInfo.district.name)
            getCommunesBasedOnDistrict(addressInfo.district.id).then((result) => {
                setCommuneInput(result);
                setAddressInfo((prev) => ({
                    ...prev,
                    commune:
                        result && result.length > 0
                            ? {
                                  id: result[0].id,
                                  name: result[0].name,
                              }
                            : null,
                }));
            });
    }, [addressInfo.district]);

    const handleGenderChange = (e) => {
        setInfoUser({
            ...infoUser,
            gender: e.target.value,
        });
    };

    const handleAddressChange = (e) => {
        setAddressInfo({
            ...addressInfo,
            address: e.target.value,
        });
    };
    const handleFullNameChange = (e) => {
        setInfoUser({
            ...infoUser,
            fullName: e.target.value,
        });
    };
    const handlePhoneNumberChange = (e) => {
        setInfoUser({
            ...infoUser,
            phoneNumber: e.target.value,
        });
    };
    const handleAddressInputChange = (e, inputColumn, nameColumn) => {
        const selectedId = e.target.value;
        const selectedColumn = inputColumn.find((item) => item.id === selectedId) || { id: null, name: null };

        return setAddressInfo({
            ...addressInfo,
            [nameColumn]: {
                id: selectedColumn.id,
                name: selectedColumn.name,
            },
        });
    };

    const genderList = ["male", "female"];

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);
    return (
        <>
            <div className="flex justify-between items-center border border-blue-200 rounded-xl p-4 transition-all duration-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 hover:shadow-md hover:cursor-pointer" onClick={openModal}>
                <p className="flex items-center gap-3 text-blue-600">
                    <span className="p-2 bg-white rounded-full shadow-sm">
                        <AiFillShop size={18} color="#3B82F6" />
                    </span>
                    {addressInfo.address && addressInfo.commune.name && addressInfo.district.name && addressInfo.province.name ? `${addressInfo.address}, ${addressInfo.commune.name}, ${addressInfo.district.name}, ${addressInfo.province.name}` : "Please provide address to receive order"}
                </p>
                <button className="p-1 rounded-full hover:bg-blue-200 transition-colors">
                    <FcNext size={18} />
                </button>
            </div>
            <Modal isOpen={isOpenModal} onClose={closeModal} title={"Delivery Address"}>
                <form className="space-y-4 p-4">
                    <div className="space-y-5">
                        <label className="block text-xl font-medium text-gray-700 mb-5">Orderer information</label>
                        {/* Gender field */}
                        <div className="flex gap-6" key={infoUser.gender}>
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
                        <TextField value={infoUser.phoneNumber} placeholder="Your phone number" onChange={handlePhoneNumberChange} type="tel" pattern="[0-9]{10}" />

                        {/* Divider */}
                        <hr className="h-2 bg-gray-300 border-none my-5" />

                        <label className="block text-xl font-medium text-gray-700 mb-5">Delivery method</label>
                        {/* Select province/city */}
                        <DropdownSelect value={addressInfo.province.id} onChange={(e) => handleAddressInputChange(e, provinceInput, "province")} inputSets={provinceInput} defaultValue={"Select province/city"} placeholder={"Your city/province"} />
                        {/* Select district */}
                        <DropdownSelect value={addressInfo.district.id} onChange={(e) => handleAddressInputChange(e, districtInput, "district")} inputSets={districtInput} defaultValue={"Select district"} placeholder={"Your district"} />
                        {/* Select commune */}
                        <DropdownSelect value={addressInfo.commune.id} onChange={(e) => handleAddressInputChange(e, communeInput, "commune")} inputSets={communeInput} defaultValue={"Select commune"} placeholder={"Your commune"} />
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
