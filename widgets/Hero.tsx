import { Container } from "@/components/Container";

export const Hero = () => {
  return (
    <div className="bg-hero text-[#f6f6f6]">
      <Container className="flex items-center flex-col text-center sm:text-left sm:items-start gap-8 justify-center h-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Timeless Luxury, Redefined
        </h1>
        <p>
          Discover curated pieces that embody heritage, craftsmanship, and quiet
          sophistication.
        </p>
        <button className="bg-transition py-3 px-20 border border-white hover:bg-white hover:text-black transition duration-300 cursor-pointer">
          Shop Now
        </button>
      </Container>
    </div>
  );
};
