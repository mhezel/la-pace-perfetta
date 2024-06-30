import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import supabase from "../services/supabase";
import Button from "../ui/Button";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("tbl_guests").delete().gt("guest_id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("tbl_cabins").delete().gt("cabin_id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("tbl_bookings").delete().gt("booking_id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("tbl_guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("tbl_cabins").insert(cabins);
  if (error) console.log(error.message);
}


async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, 
  // it will calculate them on its own. So it might be different for different people, 
  // especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, 
  // and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestIDs } = await supabase
    .from("tbl_guests")
    .select("guest_id")
    .order("guest_id");
  const allGuestIds = guestIDs.map((guest) => guest.guest_id);

  const { data: cabinsIds } = await supabase
    .from("tbl_cabins")
    .select("cabin_id")
    .order("cabin_id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.cabin_id);

  console.log("guestIDS1:", guestIDs);
  console.log("guestIDS1:", cabinsIds);

  console.log("allGuestIds:", allGuestIds);
  console.log("allCabinIds:", allCabinIds);
  


    const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabin_id - 1);
    const booking_numNights = subtractDates(booking.booking_endDate, booking.booking_startDate);
    const booking_cabinPrice = booking_numNights * (cabin.cabin_price - cabin.cabin_discount);
    const booking_extraPrice = booking.booking_hasBreakfast
      ? booking_numNights * 15 * booking.booking_numGuests
      : 0; // hardcoded breakfast price
    const booking_totalPrice = booking_cabinPrice + booking_extraPrice;

    let status;
    if (
      isPast(new Date(booking.booking_endDate)) &&
      !isToday(new Date(booking.booking_endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.booking_startDate)) ||
      isToday(new Date(booking.booking_startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.booking_endDate)) ||
        isToday(new Date(booking.booking_endDate))) &&
      isPast(new Date(booking.booking_startDate)) &&
      !isToday(new Date(booking.booking_startDate))
    )
    status = "checked-in";

    return {
      ...booking,
      booking_numNights,
      booking_cabinPrice,
      booking_extraPrice,
      booking_totalPrice,
      guest_id: allGuestIds.at(booking.guest_id  - 1), //this returns
      cabin_id: allCabinIds.at(booking.cabin_id - 1),
      booking_status: status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("tbl_bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
