import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import {toast} from 'react-hot-toast'
export function useUpdateUser(){
    const queryClint = useQueryClient();
    const {mutate:updateUserMutate, isLoading:isUpdating} = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess:(user)=>{
            toast.success("User account successfully updated");
            //queryClint.setQueryData("user", user);
            queryClint.invalidateQueries({
                queryKey:['user'],
            })
        },
        onError:(err)=>{
            //console.log(err);
            toast.error("There is some error in updating user details");
        }
    })

    return {updateUserMutate, isUpdating}
}