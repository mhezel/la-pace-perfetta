import { useQuery } from "@tanstack/react-query";
import { getCurrentLoggedUser } from "../../services/apiAuth";

export function useGetUser(){

    const {isLoading, data: user, error} = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentLoggedUser,
    });

    if(error){
        throw new Error(error.message);
      }

    return {isLoading, user, isAuthenticated: user?.role === "authenticated"};
}