import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function BookingTableOperation(){
    return(
        
        <TableOperations>
            <Filter filterField='status' options={[
                {value:'all', label: 'All'},
                 {value:'checked-out', label:'Checked Out'}, 
                 {value:'checked-in', label: 'Checked In'},
                 {value:'unconfirmed', label: 'Unconfirmed'}]}/>

                 <SortBy
                 options={[
                    {value:'startDate-desc', label:'Sort by date(recent first)'},
                    {value:'startDate-asc', label:'Sort by date(earlier first)'},
                    {value:'totalPrice-desc', label:'Sort by amount(high first)'},
                    {value:'totalPrice-asc', label:'Sort by amount(low first)'},
                   
                 ]}
                 />
                 
        </TableOperations>
    )
}
export default BookingTableOperation;
