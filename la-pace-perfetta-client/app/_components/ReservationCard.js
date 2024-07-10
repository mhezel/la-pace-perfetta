import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import Image from 'next/image';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking, onDeleteGuestBooking }) {
  const {
    booking_id,
    guest_id,
    booking_startDate,
    booking_endDate,
    booking_numNights,
    booking_totalPrice,
    booking_numGuests,
    booking_status,
    created_at,
    tbl_cabins: { cabin_name, cabin_img },
  } = booking;

  return (
    <div className='flex border border-primary-800'>
      <div className='relative h-32 aspect-square'>
        <Image
          src={cabin_img}
          fill
          alt={`Cabin ${cabin_name}`}
          className='object-cover border-r border-primary-800'
        />
      </div>

      <div className='flex-grow px-6 py-3 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>
            {booking_numNights} nights in Cabin {cabin_name}
          </h3>
          {isPast(new Date(booking_startDate)) ? (
            <span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              past
            </span>
          ) : (
            <span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-lg text-primary-300'>
          {format(new Date(booking_startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(booking_startDate))
            ? 'Today'
            : formatDistanceFromNow(booking_startDate)}
          ) &mdash; {format(new Date(booking_endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex gap-5 mt-auto items-baseline'>
          <p className='text-xl font-semibold text-accent-400'>${booking_totalPrice}</p>
          <p className='text-primary-300'>&bull;</p>
          <p className='text-lg text-primary-300'>
            {booking_numGuests} guest{booking_numGuests > 1 && 's'}
          </p>
          <p className='ml-auto text-sm text-primary-400'>
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      <div className='flex flex-col border-l border-primary-800 w-[100px]'>
        {!isPast(booking_startDate) ? (
          <>
          <Link
            href={`/account/reservations/edit/${booking_id}`}
            className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
          >
            <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
            <span className='mt-1'>Edit</span>
          </Link>
          <DeleteReservation booking_id={booking_id} onDeleteGuestBooking={onDeleteGuestBooking} />
          </>
          ) : (null)
        } 
      </div>
    </div>
  );
}

export default ReservationCard;
