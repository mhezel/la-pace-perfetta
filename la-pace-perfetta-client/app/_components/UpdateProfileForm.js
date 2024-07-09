"use client";
import { useState } from "react";
import { updateGuestProfile } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function UpdateProfileForm({children, guest}) {  
    
    //CHANGE
    // const countryFlag = "pt.jpg";
    // const nationality = "portugal";
    const [count ,setCount] = useState();
    
    const {
      guest_fullname,
      guest_email,
      guest_natID,
      guest_country,
      // guest_id
      // guest_nationality,
      } = guest;

    return (
        <form action={updateGuestProfile} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label>Full name</label>
          <input
            defaultValue={guest_fullname}
            name="guest_fullname"
            disabled
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            defaultValue={guest_email}
            name="guest_email"
            disabled
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={guest_country}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>
          {children}
          {/* importing server component to a client component render it by pass it as a prop  */}
          {/* <SelectCountry name="nationality" id="nationality" className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm" defaultCountry={nationality}/> */}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
          defaultValue={guest_natID}
            name="guest_natID"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button/>
        </div>
      </form>
    );
}

function Button(){ //this should be a client component since this is a react-hook
  const {pending, formData, method} = useFormStatus();

  return(
    <button 
    disabled={pending}
    className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
       {!pending ? 'Update profile' : 'Updating...'} 
    </button>
  );
}


export default UpdateProfileForm
