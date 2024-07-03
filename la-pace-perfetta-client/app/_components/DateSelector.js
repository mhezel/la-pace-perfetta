"use client";

import { useReservation } from "./ReservationContext";
import { isWithinInterval } from "date-fns";
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

function DateSelector({min_booking_length, max_booking_length, bookedDates, cabin}) {

  // const [range , setRange] = useState({from: undefined, to: undefined});
  const {range, setRange, resetRange} = useReservation();

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  // const range = { from: null, to: null };

  return (
    <div className="flex flex-col justify-between items-center mb-4">
        <DayPicker
          className="pt-12 place-self-center items-center"
          onSelect={setRange}
          selected={range}
          mode="range"
          min={min_booking_length + 1}
          max={max_booking_length}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
        />
      <div className="flex items-center justify-between gap-4 px-4 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-4">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl">${regularPrice}</span>
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
                <span className="text-xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold rounded-full"
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
