import styled from "styled-components";
import useMoveBack from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "../bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { useCheckout } from "./useCheckout";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;
function CheckinBooking(){
   const[confirmPaid, setConfirmPaid] = useState(false);
   const[addBreakfast, setBreakfast] = useState(false);
   const moveBack = useMoveBack();
   const {isLoading:isLoadingBooking, data:booking, error} = useBooking();
   console.log("checkin", booking);
   const {checkinMutate, isCheckingIn} = useCheckin();

   //    for calculating breakfast price, which come from settings
   const {isLoading: isLoadingSettings, settings } = useSettings();
   useEffect(()=>setConfirmPaid(booking?.isPaid || false), [booking])
   
   if(isLoadingBooking || isLoadingSettings){
    return <Spinner/>;
   }
  
   
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  
  //calculating breakfast price
  const optionalBreakfastPrice = settings.breakfastPrice * numGuests;

  //Before adding breakfast
//   function handleCheckin(){
//      if(!confirmPaid)return;
//      checkinMutate(bookingId);
//   }

function handleCheckin(){
    console.log("clicked confirmPaid", confirmPaid);
    if(!confirmPaid)return;

    if(addBreakfast){
        checkinMutate({bookingId, breakfast:{
            hasBreakfast:true,
            extrasPrice:optionalBreakfastPrice,
            totalPrice:totalPrice + optionalBreakfastPrice,
        }});
    }
    else{
       checkinMutate({bookingId, breakfast:{}});
    }
   
 }
    return(
        <>
        <Row type='horizontal'>
            <Heading type='h1'>Check in booking #{bookingId}</Heading>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />
       
        {/* for adding breakfast */}
        <Box>
         <Checkbox 
          checked={addBreakfast}
          id="breakfast"
          onChange={()=>{
             setBreakfast((add)=>!add);
             setConfirmPaid(false);
          }}
         >Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
         </Checkbox>
        </Box>

        {/* for payment */}
        <Box>
         <Checkbox 
          checked={confirmPaid}
          id="confrim"
          onChange={()=>setConfirmPaid((confirmPaid)=>!confirmPaid)}
          disabled={confirmPaid}
         >I confirm that {guests.fullName} has paid the total amount of {" "}
          {!addBreakfast ?
          formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
         </Checkbox>
        </Box>

        <ButtonGroup>
            <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking</Button>
            <Button onClick={moveBack} variation='secondary'>Back</Button>
        </ButtonGroup>
        
        </>
    )
}
export default CheckinBooking;