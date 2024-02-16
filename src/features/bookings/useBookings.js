import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAZE_SIZE } from "../../utils/constants";

export function useBookings(){
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    //filter data
    const filterValue = searchParams.get("status");
    const filter = (!filterValue || filterValue === 'all')? null : {field:'status', value:filterValue};//{field:'status', value:filterValue, method:'eq'};
   // console.log("filter valur", filterValue, filter);
   

   //Sort Data
   const sortByRaw = searchParams.get('sortBy')||'startDate-desc'
   const[field, direction] = sortByRaw.split("-");
   const sortBy = {field, direction};

   //Pagination
   const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

   //query
   const{isLoading,error, data:{data:bookings, count}={}}=useQuery({
        queryKey:['bookings', filter, sortBy, page],
        queryFn: ()=>getBookings({filter, sortBy, page}),
    })

    const pageCount = Math.ceil(count/PAZE_SIZE);
    //prefetching
    if(page < pageCount)//for next page
    queryClient.prefetchQuery({
        queryKey:['bookings', filter, sortBy, page + 1],
        queryFn: ()=>getBookings({filter, sortBy, page: page+1}),
    })

    if(page > 1)//for previous page
    queryClient.prefetchQuery({
        queryKey:['bookings', filter, sortBy, page - 1],
        queryFn: ()=>getBookings({filter, sortBy, page: page-1}),
    })
    return {isLoading,error, bookings, count};
}