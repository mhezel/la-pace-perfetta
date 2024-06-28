import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isFetching, booking } = useGetBooking();
  const { isCheckingOut, checkout } = useCheckout();
  const { deleteBooking } = useDeleteBooking();
  // const status = "checked-in";
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isFetching) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.booking_id}</Heading>
          <Tag type={statusToTagName[booking.booking_status]}>
            {booking.booking_status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <Modal>
        <BookingDataBox booking={booking} />
        <ButtonGroup>
          {(booking.booking_isPaid &&
            booking.booking_status === "checked-in") ||
          booking.booking_status === "checked-out" ? null : (
            <Button
              variations="primary"
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${booking.booking_id}`)}
            >
              Check-in
            </Button>
          )}
          {booking.booking_status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              disabled={isCheckingOut}
              onClick={() => {
                checkout(booking.booking_id);
              }}
            >
              Check-out
            </Button>
          )}

          {booking.booking_status === "checked-out" && (
            <Modal.Open opens="delete">
              <Button variations="danger">Delete Booking</Button>
            </Modal.Open>
          )}

          <Button variations="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => {
              deleteBooking(booking.booking_id, {onSettled: () => navigate(-1)});
              // navigate("/bookings");
            }}
          ></ConfirmDelete>
        </Modal.Window>
      </Modal>
    </>
  );
}
export default BookingDetail;
