import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingApi } from "../../services/apiSetting";
import { toast } from "react-hot-toast";

export function useUpdateSettings(){
   const queryClient = useQueryClient(); 
   const{mutate: updateSettingMutate, isLoading: isUpdating} =  useMutation({
        mutationFn: (newSttings)=>updateSettingApi(newSttings),
        onSuccess: ()=>{
            toast.success("settings successfully updated");
            queryClient.invalidateQueries({
                queryKey:['settings'],
            })
        },
        onError:(err)=>toast.error(err.message),
    })

    return {updateSettingMutate, isUpdating};
}