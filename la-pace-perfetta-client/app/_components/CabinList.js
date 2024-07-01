import { getCabins } from "../_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";

async function CabinList() {

    const cabins = await getCabins();
    if (!cabins.length) return null;

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.cabin_id} />
        ))}
      </div>
    )
}
export default CabinList;
