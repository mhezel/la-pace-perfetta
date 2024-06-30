import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import {useDarkMode} from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";

function SwitchModeToggle() {

    const {isDarkMode, toggleDarkMode} = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
        {isDarkMode ?  <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
    )
}

export default SwitchModeToggle;
