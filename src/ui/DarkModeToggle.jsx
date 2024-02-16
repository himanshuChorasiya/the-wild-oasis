import { useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import ButtonIcon from '../ui/ButtonIcon'
import {HiOutlineMoon, HiOutlineSun} from 'react-icons/hi2'
function DarkModeToggle(){
  const{isDarkMode, toggleDarkMode} = useDarkMode();
  
  useEffect(()=>{
    if(isDarkMode){
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode")
    }
    else{
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode")
    }
  },[isDarkMode]);

  return(
    <ButtonIcon onClick={toggleDarkMode}>
       {isDarkMode? <HiOutlineSun/> : <HiOutlineMoon/>}
    </ButtonIcon>
   )
}
export default DarkModeToggle;