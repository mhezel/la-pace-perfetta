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
import Empty from "../../ui/Empty";
import { useCheckin } from "./useCheckin";
import { useGetSettings } from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();

  //DATA-FETCHING USING CUSTOM HOOKS MADE
  const { isFetching, booking } = useGetBooking(); //get booking details
  const { isCheckingIn, checkin } = useCheckin(); // get checkin details
  const { isLoading, settings } = useGetSettings(); // get settings details

  useEffect(() => {
    setConfirmPaid(booking?.booking_isPaid);
  }, [booking]);

  if (isFetching || isCheckingIn || isLoading) return <Spinner />;

  // CHECK IF BOOKING EXISTS BEFORE DESTRUCTURING
  if (!booking) return <Empty />;

  //DECONSTRUCT
  const {
    booking_id,
    booking_totalPrice: totalPrice,
    booking_numNights: numNights,
    booking_numGuests: numGuests,
    booking_hasBreakfast: hasBreakfast,
    tbl_guests: { guest_fullname: guestName },
  } = booking;

  //CALCULATE BREAKFAST PRICE GIVEN BOOKING DETAILS: derived state
  const optionalBreakfastPrice =
    settings.breakfast_price * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        booking_id,
        breakfast: {
          booking_hasBreakfast: true,
          booking_extraPrice: optionalBreakfastPrice,
          booking_totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ booking_id, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking_id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="breakfast"
            // disabled={confirmPaid}
            onChange={() => {
              setAddBreakfast((confirm) => !confirm);
              setConfirmPaid(false); // reset state for confirm paid
            }}
          >
            Include a Breakfast meal for{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          id="total"
          // disabled={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          Confirm guest Sir/Maam <strong>{guestName}</strong> has paid the total
          amount of{" "}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
          variations={`${!confirmPaid ? "disabled" : "primary"}`}
        >
          Check in booking #{booking_id}
        </Button>
        <Button variations={"secondary"} onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
