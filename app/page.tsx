import { Collections } from "@/widgets/Collections";
import { Hero } from "@/widgets/Hero";
import { Privacy } from "@/widgets/Privacy";
import ProductSwiper from "@/widgets/ProductSwiper";

export default function Home() {
  // TODO:
  //   1) create SEO
  //   2) move login and signup logic to useAuth
  //   3) create error.tsx
  //   4) forgot password

  return (
    <>
      <Hero />
      <Collections />
      <ProductSwiper />
      <Privacy />
    </>
  );
}
