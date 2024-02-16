import { useSearchParams } from "react-router-dom";
import Select from "./Select";


function SortBy({options}){
    const[searchParams, setSearchParams] = useSearchParams();
   // console.log(options);
   const sortBy = searchParams.get('sortBy')||"";
   //const sortBy = searchParams.get('sortBy')||options.at(0).value;
   
    function handleChnage(e){
    //console.log("SORT_BY:",  e.target.value,options.at(0).value);
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);

   }
 return(
   <Select options={options}  activeValue={sortBy}onChange={handleChnage}/>
 )
}
export default SortBy;