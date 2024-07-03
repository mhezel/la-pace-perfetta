import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings, getBookedDatesByCabinId } from "@/app/_lib/data-service";

async function Reservation({cabin}) {

    const [settings, bookedDates] = await Promise.all([
        getSettings(), 
        getBookedDatesByCabinId(cabin.cabin_id),
      ]);

    //Custom styles for DayPicker
    const customDayPickerStyles = {
      day: {
        color: 'white', // Default color of the dates
        '&:hover': {
          backgroundColor: 'transparent !important', // Background color when hovered
          color: 'white', // Color when hovered
          cursor: 'pointer', // Change cursor to pointer on hover
        },
      },
    };

    return (
    <div className="grid grid-cols-2 gap-10">
      <ReservationForm cabin={cabin} />
        <div className="ml-4"> {/* Adjust the left margin value as needed */}
            <DateSelector 
                settings={settings} 
                bookedDates={bookedDates} 
                cabin={cabin}
                styles={customDayPickerStyles}
            />
        </div>
    </div>

  );
}
export default Reservation;
