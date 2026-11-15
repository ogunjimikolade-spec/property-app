//  "use client"; 
import  image from "next/image";
import Hero from "@/component/Hero";
import InfoBoxes from "@/component/InfoBoxes";
import HomeProperties from "@/component/HomeProperties";
import connectDB from "@/config/database";
import Pagination from "@/component/Pagination";
import FeaturedProperties from "@/component/FeaturedProperties";


connectDB();

export default function HomePage() {
  return (
    <div>
      <Hero/>  
      <InfoBoxes/>
      <FeaturedProperties/>
      <HomeProperties/>
      <Pagination page={1} pageSize={2} totalItems={6} />
    </div>
  )
}

