import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";


function BookingTable(){
    const {isLoading, error, bookings, count} = useBookings();
   // console.log("Bookings:",bookings);
    if(isLoading)return <Spinner/>;
   // if(!bookings.length) return <Empty resource='Booking'/>
    
    return(
      <Menus>
        <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
           <Table.Header>
                <div>Cabin</div>
                <div>Guest</div>
                <div>Dates</div>
                <div>Status</div>
                <div>Amount</div>
                <div></div>
           </Table.Header>
           <Table.Body data={bookings} render ={(booking)=>(<BookingRow booking = {booking} key={booking.id}/>)} />
           <Table.Footer>
             <Pagination count={count}/>
           </Table.Footer>
        </Table>
        </Menus>   
    )
}
export default BookingTable;