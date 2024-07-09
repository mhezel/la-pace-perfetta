"use server"; //server actions

import { revalidatePath } from "next/cache"; // manual cache revalidation
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuestBooking(formData){

    const session = await auth(); //AUTHENTICATION & AUTHORIZATION
    if(!session) throw new Error ("User must be logged-in");

    const booking_id = Number(formData.get('booking_id'));

        //additional layer for authorization
        const guestBookings = await getBookings(session.user.guest_id);
        const guestBookingIds = guestBookings.map((booking) => booking.booking_id);
    
        if(!guestBookingIds.includes(booking_id)) 
            throw new Error("Action update booking is not allowed");
    
    const updateData = {
        booking_numGuests: Number(formData.get('booking_numGuests')),
        booking_observation: formData.get('booking_observation').slice(0, 1000),
    };
    
    const { error } = await supabase
    .from('tbl_bookings')
    .update(updateData)
    .eq('booking_id', booking_id)
    .select()
    .single();

    if (error) {
        console.error('Supabase error:', error);
        throw new Error('Guest booking could not be updated');
      }
          // manual cache revalidation || re-fetching data
          revalidatePath(`/account/reservations/edit/${booking_id}`); 
          revalidatePath("/account/reservations");

    redirect("/account/reservations");
}

export async function updateGuestProfile(formData){
  
    const session = await auth(); //AUTHENTICATION & AUTHORIZATION
    if(!session) throw new Error ("User must be logged-in");

    const guest_natID = formData.get("guest_natID");
    const [guest_nationality, guest_country] = formData.get("guest_nationality").split('%');

    if(!/^[a-zA-Z0-9]{6,12}$/.test(guest_natID))
    throw new Error ("Invalid National ID");

    const updateData = {guest_natID, guest_nationality, guest_country};

    const { error } = await supabase
    .from('tbl_guests')
    .update(updateData)
    .eq('guest_id', session.user.guest_id);

    if (error) 
    throw new Error('Guest could not be updated');

    revalidatePath('/account/profile'); // manual cache revalidation || re-fetching data
}

export async function deleteGuestBooking(booking_id){
    const session = await auth(); //AUTHENTICATION & AUTHORIZATION
    if(!session) throw new Error ("User must be logged-in");

    //additional layer for authorization
    const guestBookings = await getBookings(session.user.guest_id);
    const guestBookingIds = guestBookings.map((booking) => booking.booking_id);

    if(!guestBookingIds.includes(booking_id)) 
        throw new Error("Action deleting booking is not allowed");

    const { error } = await supabase
    .from('tbl_bookings')
    .delete()
    .eq('booking_id', booking_id);

    if (error) 
        throw new Error('Booking could not be deleted');

    revalidatePath('/account/reservations'); // manual cache revalidation || re-fetching data
}

export async function signInAction(){
    await signIn('google', {redirectTo: "/account"});
}

export async function signOutAction(){
    await signOut({redirectTo: "/"});
}


