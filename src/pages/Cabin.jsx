import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import AddCabin from "../features/cabins/addCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import styled from "styled-components";
// const Styleddiv = styled.div`
//   max-height: 200px;
//   max-width: 40rem;
//   background-color: gray;
  
//   overflow: hidden;
//   -webkit-line-clamp: 5;
//   -webkit-box-orient: vertical;
//    display: -webkit-box;
// `
function Cabins() {

  // useEffect(function(){
  //  getCabins().then((data)=>console.log(data));
  // },[]);

  const [showForm, setShowForm] = useState(false);
  return (
   <>
     <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations/>
   
    </Row>
    <Row>
      <CabinTable/>
      <AddCabin/>
      {/* <Styleddiv> hhhhhhhhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhh jjjjjjjjjjjjjhhhhhhhhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhh jjjjjjjjjjjjjj</Styleddiv> */}
    </Row>
   </>
  );
}

export default Cabins;
