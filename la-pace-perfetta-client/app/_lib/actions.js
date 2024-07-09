"use server"; //server actions

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateGuestProfile(formData){
    // console.log(formData);

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
    
}

export async function signInAction(){
    await signIn('google', {redirectTo: "/account"});
}

export async function signOutAction(){
    await signOut({redirectTo: "/"});
}


