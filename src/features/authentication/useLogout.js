import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { logoutApi } from "../../services/apiAuth";

export function useLogout(){
   const navigate =  useNavigate();
   const queryClinet = useQueryClient();
  const {mutate: logoutMutate, isLoading} =  useMutation({
    mutationFn: logoutApi,
    onSuccess:()=>{
        queryClinet.removeQueries();
        navigate("/login",{replace:true})
    }
   });

   return{isLoading, logoutMutate}
}