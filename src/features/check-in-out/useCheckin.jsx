import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    //mutate === data ; in return
    mutationFn: (booking_id) =>
      updateBooking(booking_id, {
        booking_status: "checked-in", //table data that needs to be updated
        booking_isPaid: true,
      }),

    //handle api call returns
    onSuccess: (data) => {
      toast.success(`Booking #${data.booking_id} successfully checked-in`);
      queryClient.invalidateQueries({ active: true }); // resets query
      navigate("/"); //navigates to dashboard
      console.log(data);
    },

    onError: () => {
      toast.error("There was an error while checking-in");
    },
  });

  return { checkin, isCheckingIn };
}
