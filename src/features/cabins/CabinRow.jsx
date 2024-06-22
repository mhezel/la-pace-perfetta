import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    cabin_id,
    cabin_name,
    cabin_price,
    cabin_discount,
    cabin_img,
    cabin_max_capacity,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      // mutate the cache to remove the deleted cabin
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast(err.message),
  });

  return (
    <TableRow role="row">
      <Img src={cabin_img} alt={`${cabin_name} image`} />
      <Cabin>{cabin_name}</Cabin>
      <div>Fits up to {cabin_max_capacity} persons</div>
      <Price>{formatCurrency(cabin_price)}</Price>
      <Discount>{formatCurrency(cabin_discount)}</Discount>
      <button onClick={() => mutate(cabin_id)} disabled={isLoading}>
        Delete
      </button>
    </TableRow>
  );
}

export default CabinRow;
