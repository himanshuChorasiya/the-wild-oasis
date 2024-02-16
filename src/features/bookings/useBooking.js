import { useQuery } from "@tanstack/react-query";
import { getBookingbyId } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking(id){
    const {bookingId} = useParams();
    const{isLoading, data, error} = useQuery({
        queryKey:["bookings", bookingId],
        queryFn:()=>getBookingbyId(bookingId),
        retry:false,
    });
    return {data, error, isLoading};
}
