import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { formatCurrency } from "../../utils/helpers";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



function CabinRow({cabin}){
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {createCabinMutate, isCreating} = useCreateCabin();
  const {
    id: cabinId, 
    name, 
    maxCapacity,
    regularPrice, 
    discount,
    image, 
    description } = cabin;

  function handleDuplicate(){
   createCabinMutate(
    {
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    }
   )
  }  
  

  //Mutation-delete a cabin
  const queryClient = useQueryClient();//to invalidate the cache
  const {isLoading: isDeleting, mutate:deleteCabinMutate} = useMutation({
   // mutationFn:(id)=>deleteCabin(id),
    mutationFn:deleteCabin,
    onSuccess:()=>{
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey:["cabin"],
      });
    },

    onError:(err)=>toast.error(err.message),
      
  })
  
  return(
  
      <Table.Row>
          {/* <Img src={image}/>
          <Cabin>{name}</Cabin>
          <div>{maxCapacity}</div>
          <Price>{regularPrice}</Price>
          <Discount>{discount}</Discount> */}
          <Img src={image} alt="Logo" />
          <div>{name}</div>
          <div>Fits upto {maxCapacity} guests</div>
          <div>{formatCurrency(regularPrice)}</div>
          <div>{discount ? formatCurrency(discount) : <span>-</span>}</div>
          <div>
           

            <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId}></Menus.Toggle>
              <Menus.List id={cabinId}>
                <Menus.Button icon={<HiSquare2Stack/>} onClick={handleDuplicate}>Duplicate</Menus.Button>
                 {/* //for editing cabin data */}
                <Modal.Open opens="edit-cabin">
                   <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                </Modal.Open>
                 {/* //for deleting cabin */}
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
             
              <Modal.Window name="edit-cabin">
                  <CreateCabinForm  cabinToEdit={cabin}/>
              </Modal.Window>

              
              <Modal.Window name="delete" >
                  <ConfirmDelete 
                    resourceName='cabin' 
                    disabled={isDeleting}
                    onConfirm={()=>deleteCabinMutate(cabinId)} />
              </Modal.Window>
            </Modal>

            


            
           
          </div>
      </Table.Row>
  
  );
}

export default CabinRow;