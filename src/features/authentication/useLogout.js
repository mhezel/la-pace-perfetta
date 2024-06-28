import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {mutate: logout, isLoggingOut} = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
        queryClient.removeQueries(); //remove queries inside the cache 
        navigate("/login", {replace: true});
    },
  });

  return {logout, isLoggingOut};
}
