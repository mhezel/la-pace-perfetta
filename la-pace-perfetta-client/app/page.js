import Link from "next/link";
import Image from "next/image";
import background from "@/public/bg.png"; //statically import image for responsive web designing

export default function Page() {
  return (
    <main className="mt-24">
      <Image src={background} fill alt="Mountains and forests with two cabins" className="object-cover" placeholder="blur"/>
      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-black">
          The Perfect Peace. 
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-normal rounded-2xl hover:bg-accent-600 transition-all"
        >
          Explore our luxury cabins
        </Link>
      </div>
    </main>
  );
}
