import ButtonClient from "@/app/_components/ButtonClient";
import { updateGuestBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({params}) {

  // const reservationId = 23;
  // const maxCapacity = 23;

  const { booking_id } = params;
  const booking = await getBooking(booking_id);

  const { booking_numGuests, booking_observation, cabin_id } = booking;
  const {cabin_max_capacity} = await getCabin(cabin_id);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Booking Reservation #{booking_id}
      </h2>

      <form action={updateGuestBooking} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <input type="hidden" value={booking_id} name="booking_id"/> 
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="booking_numGuests"
            id="booking_numGuests"
            defaultValue={booking_numGuests}
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
            defaultValue={booking_observation}
            name="booking_observation"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
            <ButtonClient pendingLabel="Updating...">Update Booking</ButtonClient>
        </div>
      </form>
    </div>
  );
}
