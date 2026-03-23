import { Collections } from "@/widgets/Collections";
import { Hero } from "@/widgets/Hero";
import { Privacy } from "@/widgets/Privacy";
import ProductSwiper from "@/widgets/ProductSwiper";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <ProductSwiper />
      <Privacy />
    </>
  );
}
