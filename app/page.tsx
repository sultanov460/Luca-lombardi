import { Collections } from "@/widgets/Collections";
import { Hero } from "@/widgets/Hero";
import { Privacy } from "@/widgets/Privacy";

import PopularCollections from "@/widgets/PopularCollections";



export default function Home() {
  return (
    <>
      <Hero />
      <Collections />

      <PopularCollections />


      <Privacy />
    </>
  );
}
