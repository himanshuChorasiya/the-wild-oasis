import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form"
import { createEditCabin, createCabin, editCabin } from "../../services/apiCabin";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCreateCabin } from "./useCreateCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({cabinToEdit={}, onCloseModal}) {
    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);
    //const {register, handleSubmit, reset} = useForm(); 
    const {register, handleSubmit, reset} = useForm({defaultValues: isEditSession ? editValues : {},}); 
    const queryClient = useQueryClient();
    const {createCabinMutate, isCreating} = useCreateCabin();
  


   //update cabin
   const {mutate:editCabinMutate, isLoading:isUpdating} = useMutation({
    mutationFn: ({newCabinData, id})=>editCabin(newCabinData, id),
    onSuccess:()=>{
        toast.success("Cabin successfully updated");
        queryClient.invalidateQueries({
            queryKey:["cabin"]
        });
        reset();
        onCloseModal?.();
       
    },
    onError:(err)=>{toast.error(err.message); },
    });
    
    const isWorking = isCreating || isUpdating;
    function onSubmit(data){
        //console.log(data);
       // console.log(data.image);
       //mutate(data);
       //mutate({...data, image: data.image[0]});
       console.log("data.image is", data.image[0])
       const imageType = typeof(data.image) === 'string' ? data.image : data.image[0];
       if(isEditSession){
        editCabinMutate({newCabinData: {...data, image: imageType}, id:editId});
       }
       else{
        createCabinMutate({...data, image: imageType},{
            onSuccess:(data)=>{
                //console.log(data);
                reset();
                onCloseModal?.();
                
            },
        
        });
       }

    }

    function onError(errors){
      console.log(errors);
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
        <FormRow>
            <Label htmlFor="name" >Cabin name</Label>
            <Input type="text" id="name" {...register("name", {
              required: "this field is required",
            })}/>
        </FormRow>

        <FormRow>
            <Label htmlFor="maxCapacity" >Maximum capacity</Label>
            <Input type="number" id="maxCapacity" {...register("maxCapacity" , {
              required: "this field is required",
            })} />
        </FormRow>

        <FormRow>
            <Label htmlFor="regularPrice" >Regular price</Label>
            <Input type="number" id="regularPrice" {...register("regularPrice" , {
              required: "this field is required",
            })}/>
        </FormRow>

        <FormRow>
            <Label htmlFor="discount">Discount</Label>
            <Input type="number" id="discount" defaultValue={0}  {...register("discount", {
              required: "this field is required",
            })} />
        </FormRow>

        <FormRow>
            <Label htmlFor="description" >Description for website</Label>
            <Textarea type="number" id="description" defaultValue="" {...register("description", {
              required: "this field is required",
            })}/>
        </FormRow>

        <FormRow>
            <Label htmlFor="image">Cabin photo</Label>
            <FileInput id="image" type="file" accept="image/*"
              {...register("image", {
              required: isEditSession ? false: "this field is required",
            })}/>
        </FormRow>

        <FormRow>
            {/* type is an HTML attribute! */}
            <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
              Cancel
            </Button>
            <Button disabled={isWorking}> {isEditSession ? 'Edit Cabin' : 'Add Cabin'}</Button>
        </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
