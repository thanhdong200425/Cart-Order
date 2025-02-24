import SubmitButton from "./SubmitButton";

const ThirdPartyButton = ({ children, styles }) => {
    return <SubmitButton styles={styles}>{children}</SubmitButton>;
};

export default ThirdPartyButton;
