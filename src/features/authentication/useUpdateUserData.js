import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUserData() {
    const queryClient = useQueryClient();
    const {mutate: updateCurrentUser, isLoading: isUpdating} = useMutation({
        mutationFn: updateCurrentUserAPI,
        onSuccess: ({ user }) => {
            // console.log(user);
            toast.success("Account user successfully updated!");
            queryClient.setQueryData(["user"], user); //set query data value as default
        },

        onError: () => {
            toast.error("Something went wrong, unable to update account user!");
        }
    });

    return {updateCurrentUser, isUpdating};
}


