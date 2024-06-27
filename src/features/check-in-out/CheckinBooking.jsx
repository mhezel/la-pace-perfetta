import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { isFetching, booking } = useGetBooking(); //get booking details using custom hook
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();

  const {
    booking_id: id,
    booking_totalPrice: totalPrice,
    tbl_guests: { guest_fullname: guestName },
  } = booking;

  useEffect(() => {
    setConfirmPaid(booking?.booking_isPaid);
  }, [booking]);

  if (isFetching) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return null;
    checkin(id);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          // disabled={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          Confirm guest Sir/Maam <strong>{guestName}</strong> has paid the total
          amount of <strong>{formatCurrency(totalPrice)}</strong>
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
          variations={`${!confirmPaid ? "disabled" : "primary"}`}
        >
          Check in booking #{id}
        </Button>
        <Button variations={"secondary"} onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
