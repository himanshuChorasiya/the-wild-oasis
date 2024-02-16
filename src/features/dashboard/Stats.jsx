import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from 'react-icons/hi2'
function Stats({bookings, confirmStays, numDays, cabinCounts}){
   //1.
   const numBookings = bookings?.length;
  //2.
  const sales = bookings?.reduce((acc, curr)=> acc + curr.totalPrice, 0);
  //console.log("SALESS:", sales);

  //3.
  const checkin = confirmStays?.length;
  
  //4.
  //occupation = num cheked in night / all available nights(num of Days * num of Cabins).
  const occupation = confirmStays?.reduce((acc, curr)=> acc + curr.numNights,0)/(numDays*cabinCounts);
    return(
      <>
       <Stat 
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase/>}
        value={numBookings}
       />
       <Stat 
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes/>}
        value={formatCurrency(sales)}
       />
       <Stat 
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays/>}
        value={checkin}
       />
       <Stat 
        title='Occupancy'
        color='yellow'
        icon={<HiOutlineChartBar/>}
        value={Math.round(occupation*100)+'%'}
       />
      </>
    )
}
export default Stats;