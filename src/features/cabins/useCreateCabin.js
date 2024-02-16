import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";
export function useCreateCabin(){
      //creating cabin
      const queryClient = useQueryClient();
      const {mutate: createCabinMutate, isLoading:isCreating} = useMutation({
        // mutationFn: createCabin
        mutationFn: newCabin=>createCabin(newCabin),
        onSuccess:()=>{
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({
                queryKey:["cabin"]
            });
           // reset();
           
        },
        onError:(err)=>toast.error(err.message),
        });

        return{createCabinMutate, isCreating};
}