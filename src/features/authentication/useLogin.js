import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../../services/apiAuth';
import {toast} from 'react-hot-toast'

export function useLogin(){
  
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const {mutate: loginMutate, isLoading}= useMutation({
   mutationFn:({email, password})=>loginApi({email, password}),
      onSuccess:(user)=>{
        queryClient.setQueryData(["user"], user.user);
        console.log("LOGIN SUCCESS: ", user);
        navigate("/dashboard");
      },
      onError:(err)=>{
        console.log("LOGIN ERROR:",err);
        toast.error("Provided email or password are incorrect");
      }
    });

    return {loginMutate, isLoading};
}