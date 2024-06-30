import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useGetTodayActivity () {

    const {isLoading, data: activities} = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activity"],

        // onSuccess: () => {
        //     console.log(activities);
        // }
    });

  return { isLoading, activities };

}

