import { useQuery } from "@tanstack/react-query";
import { getCurrentLoggedUser } from "../../services/apiAuth";

export function useGetUser(){

    const {isLoading, data: user} = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentLoggedUser,
    });

    return{ isLoading, user, isAuthenticated: user?.role === "authenticated" };
}