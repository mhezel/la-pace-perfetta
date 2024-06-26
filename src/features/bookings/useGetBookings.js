import { useQuery } from "@tanstack/react-query";
import { getAllBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {

  const [searchParams] = useSearchParams();

  //FILTER OPTION
  const filterValue = searchParams.get("booking_status");
  const filter = !filterValue || filterValue === "all" ? null : {field: "booking_status", value: filterValue}; 


  const { isLoading: isFetching, data: bookings } = useQuery({
    queryKey: ["booking", filter],
    queryFn: () => getAllBooking({ filter }),
  });

  return { isFetching, bookings };
}
