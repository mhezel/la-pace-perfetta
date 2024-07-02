import { getCabins } from "../_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";
// import { unstable_noStore as noStore } from "next/cache";

async function CabinList({filter}) {
    //noStore(); //partial pre-rendering for a component based cache

    const cabins = await getCabins();
    if (!cabins.length) return null;

    //get data first then filter after:
    let displayedFilterCabins;

    if(filter === "all") displayedFilterCabins = cabins;
    if(filter === "small") displayedFilterCabins = cabins.filter(cabin => (cabin.cabin_max_capacity <= 3));
    if(filter === "medium") displayedFilterCabins = cabins.filter(cabin => (cabin.cabin_max_capacity >= 4 && cabin.cabin_max_capacity <= 7));
    if(filter === "large") displayedFilterCabins = cabins.filter(cabin => (cabin.cabin_max_capacity >= 8));

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedFilterCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.cabin_id} />
        ))}
      </div>
    )
}
export default CabinList;
