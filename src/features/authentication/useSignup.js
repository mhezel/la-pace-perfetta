import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    
    const {mutate: signup, isLoading: isSigningup } = useMutation({
        mutationFn: signupAPI,
        onSuccess: () => {
            // console.log(user);
            toast.success("Account successfully created, Email verification sent!");
        },
    });

    return {signup, isSigningup}
}

