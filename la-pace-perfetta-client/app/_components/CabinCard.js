import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { cabin_id, cabin_name, cabin_max_capacity, cabin_price, cabin_discount, cabin_img } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className="flex-1 relative">
        <Image
          src={cabin_img}
          alt={`Cabin ${cabin_name}`}
          fill
          className="flex-1 border-r border-primary-800 object-cover"
          quality={100}
        />
      </div>
  
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
          {cabin_name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{cabin_max_capacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {cabin_discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${cabin_price - cabin_discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${cabin_price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${cabin_price}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${cabin_id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
