import styled from "styled-components";
import Tag from "../../ui/Tag";
import {Flag} from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useCheckout } from "./useCheckout";

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
        <Button 
          onClick={() => checkout(booking_id)}
          disabled={isCheckingOut}
          size="small" 
          variations="danger" 
          as={Link} 
          to={`/bookings/${booking_id}`}>Check-out</Button>
      )}
    </StyledTodayItem>
  )
}

export default TodayItem;
