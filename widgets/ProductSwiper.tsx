"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import { Container } from "@/components/Container";

interface ProductSlide {
  id: string;
  title: string;
  href: string;
  src: string;
}

const styles: ProductSlide[] = [
  {
    id: "e1",
    title: "Obsidian Elite Overcoat",
    href: "/men-collection/m4",
    src: "/exclusive/elite-overcoat.png",
  },
  {
    id: "e2",
    title: "Designer Midi Dress",
    href: "/women-collection/w6",
    src: "/exclusive/midi-dress.png",
  },
  {
    id: "e3",
    title: "Nubuck Shearling Flight Bomber",
    href: "/men-collection/m7",
    src: "/exclusive/flight-bomber.png",
  },
  {
    id: "e4",
    title: "Handcrafted Cashmere Coat",
    href: "/women-collection/w8",
    src: "/exclusive/cashmere-coat.png",
  },
  {
    id: "e5",
    title: "Wool Cashmere Silk Reps Cargo Pant",
    href: "/men-collection/m8",
    src: "/exclusive/wool-cashmere.png",
  },
  {
    id: "e6",
    title: "Couture Evening Gown",
    href: "/women-collection/w9",
    src: "/exclusive/evening-gown.png",
  },
  {
    id: "e7",
    title: "Silk Cotton Piqué Polo",
    href: "/men-collection/m9",
    src: "/exclusive/pique-polo.png",
  },
  {
    id: "e8",
    title: "Limited Edition Embellished Jacket",
    href: "/women-collection/w10",
    src: "/exclusive/embellished-jacket.png",
  },
];

const swiperBreakpoints = {
  300: { slidesPerView: 1, spaceBetween: 16 },
  640: { slidesPerView: 2, spaceBetween: 24 },
  1024: { slidesPerView: 3, spaceBetween: 32 },
  1340: { slidesPerView: 5, spaceBetween: 32 },
};

export default function ProductSwiper() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-24 text-white overflow-hidden">
      <Container className="flex flex-col items-center gap-16 w-full">
        <header className="flex flex-col items-center gap-3 max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-light tracking-wide">
            Exclusive Styles
          </h2>
          <p className="text-gray-400 text-lg">
            Curated designs for those who value true craftsmanship
          </p>
        </header>

        <div className="relative w-full px-12 sm:px-16">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={setSwiperInstance}
            slidesPerView={1}
            spaceBetween={32}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={600}
            breakpoints={swiperBreakpoints}
            className="w-full"
          >
            {styles.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  href={item.href}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-xl"
                >
                  <div className="relative overflow-hidden rounded-xl bg-slate-700/20 h-full flex flex-col">
                    <div className="aspect-[3/4] xl:aspect-[3/5] relative overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700 transition-all duration-200 shadow-lg"
          >
            <FaAngleLeft size={22} />
          </button>

          <button
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700 transition-all duration-200 shadow-lg"
          >
            <FaAngleRight size={22} />
          </button>
        </div>
      </Container>
    </section>
  );
}
