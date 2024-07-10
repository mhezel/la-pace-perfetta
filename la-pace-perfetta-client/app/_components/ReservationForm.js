"use client";

import { createBookingReservation } from "../_lib/actions";
import ButtonClient from "./ButtonClient";
import { useReservation } from "./ReservationContext";
import { differenceInDays } from 'date-fns';

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { cabin_max_capacity, cabin_price, cabin_discount, cabin_id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabin_total_price = numNights * (cabin_price - cabin_discount);

  const bookingData = {
   booking_startDate: startDate,
   booking_endDate: endDate,
   booking_numNights: numNights,
   booking_totalPrice: cabin_total_price,
   cabin_id,
  }; // pass to server action

  const createBookingWithData = createBookingReservation.bind(null, bookingData) //bind function

  return (
    <div className="scale-[1.0]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as:</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form 
      // action={ createBookingWithData } 
      action= {async (formData) => {
        await createBookingWithData(formData);
        resetRange();
      }}
      className="bg-primary-900 py-12 px-16 text-lg flex gap-5 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="booking_numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: cabin_max_capacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="booking_observation"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {
          !(startDate && endDate) ? (
          <p className="text-primary-300 text-base">Start by selecting dates</p> 
          ) : (
          <ButtonClient pendingLabel="Reserving">Reserve now</ButtonClient> 
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;