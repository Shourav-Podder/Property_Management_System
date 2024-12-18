"use client"

import HomeSlider from "@/components/HomeSlider";
import DashboardCSS from '../style/Home.module.css';
import { useRouter } from "next/navigation";
import FeaturedProperties from "@/components/FeaturedProperties";
import Image from "next/image";
import homeImage from '../assets/Home.jpg'
import SearchingComponent from "@/components/SearchingProperty";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-white">
      <div className="relative w-full">
        <Image
          src={homeImage}
          alt="Home image"
          className="object-cover w-full h-full"
          width={1000}
          height={800}
        />
        <div className="absolute inset-0 flex mt-28 text-white px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-36">
          <div>
            <h1 className="text-6xl font-bold">
              <span className="text-white">Find Your Dream <br /> </span><span className="text-black">Property With Us</span>
            </h1>
            <p className="mt-2 text-xl">
              We provide the complete service for buying, selling, and renting property of your choice
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white">
      <SearchingComponent></SearchingComponent>
      </div>
      <div className="mt-4">
      <FeaturedProperties></FeaturedProperties>
      </div>
    </div>
  );
}
