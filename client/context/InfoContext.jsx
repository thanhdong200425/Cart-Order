import { createContext, useEffect, useState } from "react";

const InfoUserContext = createContext();

export const InfoUserProvider = ({ children }) => {
    // Dynamically load info user from the local storage if it exists
    const [infoUser, setInfoUser] = useState(() => {
        const savedInfo = localStorage.getItem("infoUser");
        return savedInfo
            ? JSON.parse(savedInfo)
            : {
                  fullName: "",
                  phoneNumber: "",
                  gender: "",
                  province: {},
                  district: {},
                  commune: {},
                  address: "",
              };
    });

    useEffect(() => {
        localStorage.setItem("infoUser", JSON.stringify(infoUser));
    }, [infoUser]);

    const exportValue = [infoUser, setInfoUser];

    return <InfoUserContext.Provider value={exportValue}>{children}</InfoUserContext.Provider>;
};

export default InfoUserContext;
