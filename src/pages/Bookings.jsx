
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperation from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings(){
    return(
      <>
        <Row type="horizontal">
          <Heading as="h1">All Booking</Heading>
          <BookingTableOperation/>
        </Row>
        <BookingTable/>
      </>
    )
}
export default Bookings;