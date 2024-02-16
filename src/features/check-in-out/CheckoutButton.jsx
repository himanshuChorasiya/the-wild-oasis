import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";


function CheckoutButton({ bookingId }) {
  
  const {checkoutMutate, isCheckingOut} = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={()=>checkoutMutate(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
