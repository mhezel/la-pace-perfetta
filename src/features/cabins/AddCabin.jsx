import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

// function AddCabin() {
// const [isOpenModal, setIsOpenModal] = useState(false);
  
//   return (
//     <>
//         <Button onClick={() => setIsOpenModal((showModal) => !showModal)}>Add new cabin</Button>
//         {isOpenModal && 
//           <Modal onClose={() => setIsOpenModal(false)}>
//             <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
//           </Modal>
//         }
//     </>
//   );
// }

function AddCabin(){
  return (
    <div>
    <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm/>
        </Modal.Window>
    </Modal>
  </div>
  );
}

export default AddCabin;
