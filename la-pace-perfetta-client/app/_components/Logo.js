import Image from "next/image";
import Link from "next/link";

//using Image component instead of <img> {prevents layout shift, auto lazy-loading of images for optimization}

import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image height="60" width="60" alt="The Wild Oasis logo" src="/logo.png"/>  */}
      <Image src={logo} height="60" width="60" alt="La Pace Perfetta logo" quality={100}/>  
      <span className="text-xl font-semibold text-primary-100">
        La Pace Perfetta
      </span>
    </Link>
  );
}
export default Logo;
