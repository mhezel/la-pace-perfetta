import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useGetCabin() {
  const { isLoading: isFetching, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  return { isFetching, cabins };
}
