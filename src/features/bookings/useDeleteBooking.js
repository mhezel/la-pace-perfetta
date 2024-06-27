import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteSelectedBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (booking_id) => deleteSelectedBooking(booking_id),
    onSuccess: () => {
      toast.success("booking successfully deleted");
      // mutate the cache to remove the deleted cabin
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => toast(err.message),
  });

  return { isDeleting, deleteBooking };
}
//abstracting data logic{react query} into a custom hook
