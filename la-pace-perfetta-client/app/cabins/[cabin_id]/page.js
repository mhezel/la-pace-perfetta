import { getCabin } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

export const revalidate = 3600; //needs always in seconds

export async function generateMetadata({params}){
  
    const {cabin_name} = await getCabin(params.cabin_id);
    return {
        title: `Cabin - ${cabin_name}`,
    }
}

export default async function Page({params}) {
  const cabin = await getCabin(params.cabin_id);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin}/>
        <div>
          <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
            Reserve today. Pay on arrival.
          </h2>
          <Suspense fallback={<Spinner/>}>
            <Reservation cabin={cabin} />
          </Suspense>
        </div>
    </div>
  );
}
