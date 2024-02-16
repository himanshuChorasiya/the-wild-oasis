import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
   const {isLoading, mutate: signupMutate} =  useMutation({
        mutationFn:signUpApi,
        onSuccess:(user)=>{
            console.log("NEW User:", user);
            toast.success("Account successfully created!")
        },
        onError:(err)=>{
           toast.error("There is some error in creating new user");
        }
    })

    return {signupMutate, isLoading};
}