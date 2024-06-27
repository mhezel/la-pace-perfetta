import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    //mutate === data ; in return
    mutationFn: (booking_id) =>
      updateBooking(booking_id, {
        booking_status: "checked-out",
      }),

    //handle api call returns
    onSuccess: (data) => {
      toast.success(`Booking #${data.booking_id} successfully checked-out`);
      queryClient.invalidateQueries({ active: true }); // resets query
      //navigate("/bookings"); //navigates to
      //console.log(data);
    },

    onError: () => {
      toast.error("There was an error while checking-out");
    },
  });

  return { checkout, isCheckingOut };
}
