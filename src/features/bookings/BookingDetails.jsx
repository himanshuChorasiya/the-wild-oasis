import {styled} from 'styled-components'
import  Row from '../../ui/Row'
import Heading from "../../ui/Heading";
import ButtonText from '../../ui/ButtonText';
import useMoveBack from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from "../../ui/Spinner";
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button'
import BookingDataBox from './BookingDataBox';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import { useDeleteBooking } from './useDeleteBooking';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;


function BookingDetails() {

   const moveBack = useMoveBack();
   const navigate = useNavigate();
   const {isLoading, data:booking, error} = useBooking();
   const {checkoutMutate, isCheckingOut} = useCheckout();
   const {deleteBookingMutate, isDeleting} = useDeleteBooking();

   if(isLoading){
    return <Spinner/>;
   }
   const {status, id:bookingId} = booking;
   console.log("Booking Details", booking);
    return (
      <>
        <Row type='horizontal'>
          <HeadingGroup>
            <Heading as='h1'>Booking #{bookingId}</Heading>
            <div>{status}</div>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          </HeadingGroup>
        </Row>  
        <BookingDataBox booking={booking}/>
        <ButtonGroup>
             {status === 'unconfirmed' && 
              <Button 
                onClick={()=>navigate(`/checkin/${bookingId}`)}>
                Check in
              </Button>}
              {status === 'checked-in' && <Button  onClick={()=>checkoutMutate(bookingId)} disabled={isCheckingOut}>Check out</Button>}

              <Modal>
                  <Modal.Open opens='delete'>
                    <Button variation='danger'>Delete booking</Button>
                  </Modal.Open>
                  <Modal.Window name='delete' >
                      <ConfirmDelete
                      resourceName='booking'
                      disabled={isDeleting}
                      onConfirm={()=>deleteBookingMutate(bookingId,{
                        onSettled:()=>navigate(-1),
                      })}
                      />
                  </Modal.Window>
              </Modal>
            <Button variation='secondary' onClick={moveBack}>Back</Button>
        </ButtonGroup>
    </>
    )
}
export default BookingDetails