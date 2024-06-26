import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useGetBooking() {
  const { booking_id } = useParams();

  const {
    isLoading: isFetching,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", booking_id],
    queryFn: () => getBooking(booking_id),
    retry: false,
  });

  return { isFetching, error, booking };
}
