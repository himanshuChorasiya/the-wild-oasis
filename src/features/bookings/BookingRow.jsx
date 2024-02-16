import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import {format} from 'date-fns'

import { formatCurrency} from "../../utils/helpers";
import { useDeleteBooking } from "./useDeleteBooking";


// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
 
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

// const Amount = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
// `;

const Amount = styled.div`
  
  font-weight: 500;
`;

function BookingRow({
    booking:{
        id:bookingId,
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        totalPrice,
        status,
        guests:{fullName: guestName,email},
        cabins:{name:cabinName},
    }
}){
  const {checkoutMutate, isCheckingOut} = useCheckout();
    const navigate = useNavigate();
    const statusToTagName={
        "unconfirmed":"blue",
        "cheched-in":"green",
        "checked-out": "silver",

    }
    
    const {deleteBookingMutate, isDeleting} = useDeleteBooking();
    
    return (
     //<Menus>
      <Table.Row>
         <Cabin>{cabinName}</Cabin>
        <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
        </Stacked>
        <Cabin>{format(new Date(startDate), "MMM dd yyyy")} &mdash; {format(new Date(endDate), "MMM dd yyyy")}</Cabin>
        <Cabin>{status}</Cabin>
        <Amount>{formatCurrency(totalPrice)}</Amount>
        
        {/* contextMenu */}
        <Modal>
        <Menus.Menu>
         <Menus.Toggle id={bookingId}/>
           <Menus.List id={bookingId}>
            <Menus.Button icon={<HiEye/>} onClick={()=>navigate(`/bookings/${bookingId}`)}>view details</Menus.Button>
            {status === 'unconfirmed' && <Menus.Button icon={<HiArrowDownOnSquare/>} onClick={()=>navigate(`/checkin/${bookingId}`)}>Check in</Menus.Button>}
            {status === 'checked-in' && <Menus.Button icon={<HiArrowUpOnSquare/>} onClick={()=>checkoutMutate(bookingId)} disabled={isCheckingOut}>Check out</Menus.Button>}
          
              <Modal.Open opens='delete'>
                 <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
              </Modal.Open>
              
           </Menus.List>
         
        </Menus.Menu> 
        <Modal.Window name='delete' >
                  <ConfirmDelete
                  resourceName='booking'
                  disabled={isDeleting}
                  onConfirm={()=>deleteBookingMutate(bookingId)}
                  />
        </Modal.Window>
        </Modal>
      </Table.Row>
      //</Menus>   
    )
}
export  default BookingRow;