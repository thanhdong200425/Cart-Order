import { useContext, useEffect, useState } from "react";
import { AiFillShop } from "react-icons/ai";
import { FcNext } from "react-icons/fc";
import Modal from "./Modal";
import axios from "axios";
import DropdownSelect from "../selects/DropdownSelect";
import TextField from "../../inputs/TextField";
import SubmitButton from "../../buttons/SubmitButton";
import InfoUserContext from "../../../context/InfoContext";

const apiCache = {
    provinces: null,
    districts: {},
    communes: {},
};

/**
 * Custom hook for fetching and caching location data (provinces, districts, communes)
 * @param {string} url - API endpoint to fetch data from
 * @param {string} cacheKey - Key to store data in the cache ('provinces', 'districts', 'communes')
 * @param {string|boolean} dependency - The parent location ID that this data depends on
 * @param {Object} infoUser - User information containing selected locations
 * @param {Function} setInfoUser - Function to update user information
 * @param {string} infoUserKey - Key in infoUser object to update ('province', 'district', 'commune')
 * @returns {Array} - Array of location data
 */
const useLocationData = (url, cacheKey, dependency, infoUser, setInfoUser, infoUserKey) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // Skip if dependency is not available (needed for districts/communes)
            if (!dependency) return;

            // Determine if we should use the root cache or a nested cache based on dependency
            const cacheValue = cacheKey === "provinces" ? apiCache[cacheKey] : apiCache[cacheKey][dependency];

            // If cache value exists, use it instead of making a new API request
            if (cacheValue) {
                setData(cacheValue);
                // Set default value if none is selected yet
                if (!infoUser[infoUserKey]?.id) updateDefaultValue(cacheValue);
                return;
            }

            // If no cache exists, fetch data from API
            try {
                const response = await axios.get(url);
                const result = response.data.data || [];

                // Store in cache differently based on whether it's provinces (root) or districts/communes (nested)
                if (infoUserKey === "province") apiCache[cacheKey] = result;
                else apiCache[cacheKey][dependency] = result;

                setData(result);
                // Set default value if none is selected yet
                if (!infoUser[infoUserKey]?.id) updateDefaultValue(result);
            } catch (error) {
                console.error(`Error fetching ${infoUserKey}:`, error);
                setData([]);
            }
        };

        /**
         * Sets the default selection to the first item in the result array
         * @param {Array} result - Array of location items
         */
        const updateDefaultValue = (result) => {
            if (result.length > 0) {
                setInfoUser((prev) => ({
                    ...prev,
                    [infoUserKey]: { id: result[0].id, name: result[0].name },
                }));
            }
        };

        fetchData();
    }, [dependency, infoUser, setInfoUser, infoUserKey, url, cacheKey]);

    return data;
};

const AddressModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [infoUser, setInfoUser] = useContext(InfoUserContext);

    const provinces = useLocationData("https://open.oapi.vn/location/provinces?size=63", "provinces", true, infoUser, setInfoUser, "province");
    const districts = useLocationData(`https://open.oapi.vn/location/districts/${infoUser.province?.id}`, "districts", infoUser.province?.id, infoUser, setInfoUser, "district");
    const communes = useLocationData(`https://open.oapi.vn/location/wards/${infoUser.district?.id}`, "communes", infoUser.district?.id, infoUser, setInfoUser, "commune");

    const handleGenderChange = (e) => {
        setInfoUser({
            ...infoUser,
            gender: e.target.value,
        });
    };

    const handleAddressChange = (e) => {
        setInfoUser({
            ...infoUser,
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

        return setInfoUser({
            ...infoUser,
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
                    {infoUser.address && infoUser.commune.name && infoUser.district.name && infoUser.province.name ? `${infoUser.address}, ${infoUser.commune.name}, ${infoUser.district.name}, ${infoUser.province.name}` : "Please provide address to receive order"}
                </p>
                <button className="p-1 rounded-full hover:bg-blue-200 transition-colors">
                    <FcNext size={18} />
                </button>
            </div>
            <Modal isOpen={isOpenModal} onClose={closeModal} title={"Delivery Address"}>
                {/* Main part */}
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
                        <DropdownSelect value={infoUser.province.id} onChange={(e) => handleAddressInputChange(e, provinces, "province")} inputSets={provinces} defaultValue={"Select province/city"} placeholder={"Your city/province"} />
                        {/* Select district */}
                        <DropdownSelect value={infoUser.district.id} onChange={(e) => handleAddressInputChange(e, districts, "district")} inputSets={districts} defaultValue={"Select district"} placeholder={"Your district"} />
                        {/* Select commune */}
                        <DropdownSelect value={infoUser.commune.id} onChange={(e) => handleAddressInputChange(e, communes, "commune")} inputSets={communes} defaultValue={"Select commune"} placeholder={"Your commune"} />
                        <TextField placeholder={"Your address"} value={infoUser.address} onChange={handleAddressChange} />

                        <SubmitButton content={"Confirm"} styles={"mt-5"} onClick={closeModal} />
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddressModal;
