import { useQuery } from "@tanstack/react-query";
import { getAllBooking } from "../../services/apiBookings";

export function useGetBookings() {
  const { isLoading: isFetching, data: bookings } = useQuery({
    queryKey: ["booking"],
    queryFn: getAllBooking,
  });

  return { isFetching, bookings };
}
