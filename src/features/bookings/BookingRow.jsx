import { format, isToday, getYear, getMonth } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import styled from "styled-components";
import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { useCheckout } from "../check-in-out/useCheckout";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    booking_id: id,
    booking_startDate: startDate,
    booking_endDate: endDate,
    booking_numNights: numNights,
    booking_totalPrice: totalPrice,
    booking_status: status,
    tbl_guests: { guest_fullname: guestName, guest_email: email },
    tbl_cabins: { cabin_name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();

  // FORMAT BOOKING-REF-ID #
  // Get the first letter of the first name and last name of the guest
  const [firstName, lastName] = guestName.split(" ");
  const guestInitials = `${firstName.charAt(0)}${
    lastName ? lastName.charAt(0) : ""
  }`;
  // Get the last two digits of the current year
  const lastTwoDigitsOfYear = getYear(new Date()).toString().slice(-2);
  // Get the current month (zero-indexed), add 1 to match human-readable format
  const currentMonth = getMonth(new Date()) + 1;
  // Reference ID format: id-lastTwoDigitsOfYearcurrentMonth[Guest Initials]
  const referenceId = `${id}-${lastTwoDigitsOfYear}${currentMonth}${guestInitials}`;

  return (
    <Table.Row>
      <div>{referenceId}</div>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={id} />
        <Menus.List id={id}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${id}`)}
          >
            See Details
          </Menus.Button>
          {status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check-in
            </Menus.Button>
          )}

          {status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              disabled={isCheckingOut}
              onClick={() => {
                checkout(id);
              }}
            >
              Check-out
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
