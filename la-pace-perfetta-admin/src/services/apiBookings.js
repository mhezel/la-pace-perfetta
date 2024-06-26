import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getAllBooking({ filter, sortBy, page }) {
  let query = supabase
    .from("tbl_bookings")
    .select(
      "*, tbl_cabins(cabin_name), tbl_guests(guest_fullname, guest_email)",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    // const to = Math.min(from + PAGE_SIZE - 1, count - 1); // Ensure `to` does not exceed `count - 1`
    query = query.range(from, to);
  }

  const { data, error, count } = await query; //AWAIT QUERY RESULTS

  if (error) {
    console.log(error);
    throw new Error("Error in fetching booking data");
  }

  return { data, count };
}

export async function getBooking(booking_id) {
  const { data, error } = await supabase
    .from("tbl_bookings")
    .select("*, tbl_cabins(*), tbl_guests(*)")
    .eq("booking_id", booking_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("tbl_bookings")
    .select("created_at, booking_totalPrice, booking_extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("tbl_bookings")
    // .select('*')
    .select("*, tbl_guests(guest_fullname)")
    .gte("booking_startDate", date)
    .lte("booking_startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("tbl_bookings")
    .select("*, tbl_guests(guest_fullname, guest_nationality, guest_country)")
    .or(
      `and(booking_status.eq.unconfirmed,booking_startDate.eq.${getToday()}),and(booking_status.eq.checked-in,booking_endDate.eq.${getToday()})`
    )
    .order("created_at");
    
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(booking_id, obj) {
  const { data, error } = await supabase
    .from("tbl_bookings")
    .update(obj)
    .eq("booking_id", booking_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(booking_id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from("tbl_bookings")
    .delete()
    .eq("booking_id", booking_id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
