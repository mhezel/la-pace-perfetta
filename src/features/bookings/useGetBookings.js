import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //FILTER OPTION
  const filterValue = searchParams.get("booking_status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "booking_status", value: filterValue };

  //SORTING OPTION
  const sortByRaw = searchParams.get("sortBy") || "booking_startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION OPTION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading: isFetching,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["booking", filter, sortBy, page],
    queryFn: () => getAllBooking({ filter, sortBy, count, page }),
  });

  // [pre-fetching data] QUERY CLIENT
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page + 1],
      queryFn: () => getAllBooking({ filter, sortBy, count, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page - 1],
      queryFn: () => getAllBooking({ filter, sortBy, count, page: page - 1 }),
    });

  return { isFetching, error, bookings, count };
}
