import { useQuery } from "@tanstack/react-query";
import { getAllBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {

  const [searchParams] = useSearchParams();

  //FILTER OPTION
  const filterValue = searchParams.get("booking_status");
  const filter = !filterValue || filterValue === "all" ? null : {field: "booking_status", value: filterValue}; 

  //SORTING OPTION
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const { isLoading: isFetching, data: bookings } = useQuery({
    queryKey: ["booking", filter, sortBy],
    queryFn: () => getAllBooking({ filter , sortBy}),
  });

  return { isFetching, bookings };
}
