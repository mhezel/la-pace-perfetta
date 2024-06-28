// getStaysAfterDate

import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";


export function useGetRecentStays(){

    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

    const queryDate = subDays(new Date(), numDays).toISOString();

    const {isLoading, data: stays} = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}`],
    });

    const confirmStays = stays?.filter((stay) => stay.booking_status === 'checked-in' || 'checked-out');
    return { isLoading, confirmStays, numDays};
}