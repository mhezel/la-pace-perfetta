import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabin";
import CreateCabinForm from "./CreateCabinForm";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    cabin_id,
    cabin_name,
    cabin_price,
    cabin_discount,
    cabin_img,
    cabin_max_capacity,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      cabin_name: `Copy of ${cabin_name}`,
      cabin_price,
      cabin_discount,
      cabin_img,
      cabin_max_capacity,
    });
  }

  // console.log(cabin_id);

  return (
    <Table.Row role="row">
      <Img src={cabin_img} alt={`${cabin_name} image`} />
      <Cabin>{cabin_name}</Cabin>
      <div>Fits up to {cabin_max_capacity} persons</div>
      <Price>{formatCurrency(cabin_price)}</Price>
      {cabin_discount ? (
        <Discount>{formatCurrency(cabin_discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* <button disabled={isCreating}>
          <HiSquare2Stack />
        </button> */}
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin_id} />
            <Menus.List id={cabin_id}>
              {" "}
              {/* DUPLICATE MODAL */}
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate} isCreating={isCreating}>
                Duplicate
              </Menus.Button>
              {/* EDIT MODAL */}
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              {/* DELETE MODAL */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabin_id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
export default CabinRow;
