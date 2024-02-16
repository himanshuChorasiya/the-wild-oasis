import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";
import Spinner from "../../ui/Spinner"
import styled from "styled-components";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable(){

    const {isLoading, data:cabins, error} = useQuery({
        queryKey:["cabin"],
        queryFn: getCabins,
    });
    const[searchParams] = useSearchParams();
    if(isLoading) return <Spinner/>
    if(!cabins.length) return <Empty resource='Cabins'/> 
  
    //For filtering cabin data based on discount
   
    const filterValue = searchParams.get('discount') || 'all';
    //console.log(filterValue);
    
    let filteredCabin;
    if(filterValue === "all")filteredCabin = cabins;
    if(filterValue === "no-discount"){
        filteredCabin = cabins && cabins.filter((cabin)=>cabin.discount === 0);
    }
    if(filterValue === "with-discount"){
        filteredCabin = cabins && cabins.filter((cabin)=>cabin.discount > 0);
    }

    //For sorting
    const sortBy = searchParams.get('sortBy')||'startDate-asc';
    const[field, direction] = sortBy.split("-");
    console.log("filed:", field, "direction:", direction);
   // console.log("filterCabin",filteredCabin);
    const modifier = direction === 'asc' ? 1 : -1;
    const sortCabins = filteredCabin && filteredCabin.sort((a,b)=>(a[field]-b[field])*modifier);
   //console.log(filteredCabin);
  
    return(
      <Menus>
        <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
            <Table.Header >
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>
            <Table.Body data ={sortCabins} render ={(cabin)=>(<CabinRow cabin = {cabin} key={cabin.id}/>)}/>
          
        </Table>
     </Menus>
    )
}
export default CabinTable;