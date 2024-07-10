import { getSettings, getBookedDatesByCabinId } from "@/app/_lib/data-service";
import { auth } from "../_lib/auth";
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import LoginMessage from "./LoginMessage";

async function Reservation({cabin}) {

    const [settings, bookedDates] = await Promise.all([
        getSettings(), 
        getBookedDatesByCabinId(cabin.cabin_id),
    ]);

    const session = await auth();
    // console.log(bookedDates);

    return (
      <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector 
              settings={settings} 
              bookedDates={bookedDates} 
              cabin={cabin}
            />
            {session?.user ? (
            <ReservationForm cabin={cabin} user={session.user}/> 
            ) : (
            <LoginMessage/>
            )}
      </div>
  );
}
export default Reservation;
