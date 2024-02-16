import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
export function useDeleteBooking(){
        
    const queryClient = useQueryClient(); 
    const{mutate: deleteBookingMutate, isLoading:isDeleting}  = useMutation({
        mutationFn:(bookingId)=>deleteBooking(bookingId),
        onSuccess:()=>{
        toast.success(`Booking successfully deleted`);
        queryClient.invalidateQueries({
           queryKey:["bookings"]
        });
        },
        onError:(err)=>toast.error(err),

    })
    return {deleteBookingMutate, isDeleting}
}