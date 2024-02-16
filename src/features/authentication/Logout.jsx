import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from '../../ui/ButtonIcon'
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
function Logout(){
    const {isLoading, logoutMutate} = useLogout();
    return (

        <ButtonIcon disabled={isLoading} onClick={logoutMutate}>
           {!isLoading ? <HiArrowRightOnRectangle/> : <SpinnerMini/>}
        </ButtonIcon>
    )
}
export default Logout;