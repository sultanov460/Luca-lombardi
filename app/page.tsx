import { Collections } from "@/widgets/Collections";
import { Hero } from "@/widgets/Hero";
import { Privacy } from "@/widgets/Privacy";
import ProductSwiper from "@/widgets/ProductSwiper";

export default function Home() {
  // TODO:
  //   1) create SEO
  //   2) move login and signup logic to useAuth
  //   3) design error.tsx button
  //   4) forgot password
  // 5) catalogda bazdigi hell elemek
  // 6) quantity type error hell elemek
  // 7) style search input and search page //completed
  // 8) style cart and fix decrement error
  return (
    <>
      <Hero />
      <Collections />
      <ProductSwiper />
      <Privacy />
    </>
  );
}
