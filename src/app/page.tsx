import { Hero } from "@/components/home/Hero";
import { QuickInfo } from "@/components/home/QuickInfo";
import { Highlights } from "@/components/home/Highlights";
import { FacilitiesBand } from "@/components/home/FacilitiesBand";
import { HomeCta } from "@/components/home/HomeCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickInfo />
      <Highlights />
      <FacilitiesBand />
      <HomeCta />
    </>
  );
}
