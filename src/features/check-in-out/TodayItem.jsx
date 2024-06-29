import {Flag} from "../../ui/Flag";
import { Link, useNavigate } from "react-router-dom";
import { useCheckout } from "./useCheckout";
import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmCheckOut from "../../ui/ConfirmCheckOut";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;


function TodayItem({activity}) {

  const {isCheckingOut, checkout} = useCheckout();
  const navigate = useNavigate();

  const { 
    booking_id, 
    booking_status, 
    tbl_guests: {
      guest_country,
      guest_fullname,
    },
    booking_numNights
  } = activity;

  return (
    <Modal>
    <StyledTodayItem>
      {booking_status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {booking_status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guest_country} alt={`Flag of ${guest_country}`}/>
      <Guest>{guest_fullname}</Guest>
      <div>{booking_numNights} nights</div> 

      {booking_status === "unconfirmed" && (
        <Button 
          size="small" 
          // variations="primary" 
          as={Link} 
          to={`/checkin/${booking_id}`}>Check-in</Button>
      )}

      {booking_status === "checked-in" && (
        <Modal.Open opens="out">
          <Button variations="danger" disabled={isCheckingOut} size="small">Check-out</Button>
        </Modal.Open>
      )}
        <Modal.Window name="out">
        <ConfirmCheckOut
            resourceName={`Booking #${booking_id}`}
            onConfirm={() => {
              checkout(booking_id, {
                onSettled: () => navigate(`/bookings/${booking_id}`)});
            }}
          ></ConfirmCheckOut>
        </Modal.Window>
    </StyledTodayItem>
    </Modal>
  )
}
export default TodayItem;


// {booking.booking_status === "checked-out" && (
//   <Modal.Open opens="delete">
//     <Button variations="danger">Delete Booking</Button>
//   </Modal.Open>
// )}

// <Button variations="secondary" onClick={moveBack}>
//   Back
// </Button>
// </ButtonGroup>

// <Modal.Window name="delete">
// <ConfirmDelete
//   resourceName="booking"
//   onConfirm={() => {
//     deleteBooking(booking.booking_id, {onSettled: () => navigate(-1)});
//     // navigate("/bookings");
//   }}
// ></ConfirmDelete>
// </Modal.Window>