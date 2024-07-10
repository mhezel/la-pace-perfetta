"use client";

import { useOptimistic } from "react";
import { deleteGuestBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }){

    // actual state & optimistic state
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings, (currBookings, booking_id) => {
            return currBookings.filter(
                (booking) => booking.booking_id !== booking_id); 
            // filter works as => to keep all bookings where booking id's are different from the booking id we passed in
        }
    ); 

    async function handleDelete(booking_id){
        optimisticDelete(booking_id); 
        await deleteGuestBooking(booking_id); //async function
    }

    return(
        <ul className="space-y-6">
          { optimisticBookings.map((booking) => (
            <ReservationCard onDeleteGuestBooking={handleDelete} booking={booking} key={booking.booking_id} />
          ))}
        </ul>
    );
}

export default ReservationList;