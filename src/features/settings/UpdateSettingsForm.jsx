import Input from '../../ui/Input';
import styled from 'styled-components';
import Form from '../../ui/Form';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSettings } from './useUpdateSettings';

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

function UpdateSettingsForm() {
  
  const {isLoading, settings:{minBookingLength, maxBookingLength, maxGuestsperBooking, breakfastPrice} = {}} = useSettings();
  //console.log("Setings", settings);
 // console.log(minBookingLength, maxBookingLength,maxGuestsperBooking, breakfastPrice);
  
 const {updateSettingMutate, isUpdating} = useUpdateSettings();
 function handleUpdate(e, field){

    const value = e.target.value;
    //console.log(value);
    if(!value)return;
    updateSettingMutate({[field]: value});
 }
 if(isLoading)return <Spinner/>
  
  return (
      
    <Form>

        <FormRow>
            <Label htmlFor="min-night" >Minimum nights/booking</Label>
            <Input type="number" 
            id="min-night" 
            defaultValue={minBookingLength}
            onBlur={(e)=>handleUpdate(e,'minBookingLength')}
            disabled={isUpdating}
             />
        </FormRow>

        <FormRow>
            <Label htmlFor="max-night" >Maximum nights/booking</Label>
            <Input type="number" 
            id="max-night"
            defaultValue={maxBookingLength}
            onBlur={(e)=>handleUpdate(e,'maxBookingLength')}
            disabled={isUpdating} />
        </FormRow>
        <FormRow>
            <Label htmlFor="max-guests" >Maximum guests/booking</Label>
            <Input type="number" 
            id="max-guests"
             defaultValue={maxGuestsperBooking}
             onBlur={(e)=>handleUpdate(e,'maxGuestsperBooking')}
            disabled={isUpdating}
              />
        </FormRow>
        <FormRow>
            <Label htmlFor="breakfast-price" >Breakfast price</Label>
            <Input type="number" 
            id="breakfast-price" 
            defaultValue={breakfastPrice}
            onBlur={(e)=>handleUpdate(e,'breakfastPrice')}
            disabled={isUpdating}

             />
        </FormRow>
    </Form>

   
  );
}

export default UpdateSettingsForm;
