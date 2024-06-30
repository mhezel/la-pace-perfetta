import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";

import { Josefin_Sans } from "next/font/google"; //import custom fonts from google as a function object


const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap", //display the text in default and swap the downloaded font after
});

export const metadata = {
  // title: "La Pace Perfetta",
  title: { 
    template : "%s / La Pace Perfetta",
    default: "Welcome / La Pace Perfetta",
  },
  description: "Luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forest.", //for SEO
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ `${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>
        <Header/>
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
