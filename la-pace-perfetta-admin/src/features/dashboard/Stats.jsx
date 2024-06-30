import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import {useGetCabin} from "../cabins/useGetCabin";

function Stats({bookings, confirmStays, numDays}) {

    const {cabins} = useGetCabin();
    const cabinCount = cabins?.length;

    //1. no. of bookings
    const numOfBookings = bookings.length;

    //2. no. of sales
    const salesBooking = bookings.reduce((acc, curr) => acc + curr.booking_totalPrice, 0);
    const formattedSalesBooking = formatCurrency(salesBooking);

    //3. no of total check-ins
    const totalCheckins = confirmStays.length;

    //4. occupancy-rates
    const rate = confirmStays.reduce((acc, curr) => acc + curr.booking_numNights, 0) / (numDays) * cabinCount;
    const formattedRate = rate.toFixed(2) + "%";

    return (
        <>
            <Stat value={numOfBookings} title="Bookings" color="blue" icon={<HiOutlineBriefcase/>}/>
            <Stat value={totalCheckins} title="Check-ins" color="indigo" icon={<HiOutlineCalendarDays/>}/>
            <Stat value={formattedSalesBooking} title="Sales" color="green" icon={<HiOutlineBanknotes/>}/>
            <Stat value={formattedRate} title="Occupancy Rates" color="yellow" icon={<HiOutlineChartBar/>}/>
        </>  
    );
}

export default Stats;
