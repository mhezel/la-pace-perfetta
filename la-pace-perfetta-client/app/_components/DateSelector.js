"use client";

import { useReservation } from "./ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {

  // const [range , setRange] = useState({from: undefined, to: undefined});

  const { range, setRange, resetRange } = useReservation();
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range; // CHANGE

  // CHANGE
  // const regularPrice = 23;
  // const discount = 23;
  // const numNights = 23;
  // const cabinPrice = 23;
  // const range = { from: null, to: null };

  const { cabin_price, cabin_discount } = cabin;
  const { min_booking_length, max_booking_length } = settings;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabin_total_price = numNights * (cabin_price - cabin_discount);

  // console.log(bookedDates);
  // console.log(min_booking_length, max_booking_length);

  return (
    <div className="flex flex-col justify-between">
       <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={min_booking_length + 1}
        max={max_booking_length}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>isPast(curDate) || 
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />
        <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {cabin_discount > 0 ? (
              <>
                <span className="text-2xl font-semibold">${cabin_price - cabin_discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${cabin_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${cabin_price}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total:</span>{" "}
                <span className="text-2xl font-semibold">${cabin_total_price}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-6 text-sm font-semibold rounded-full"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
