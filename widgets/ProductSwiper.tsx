"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { Container } from "@/components/Container";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function ProductSwiper() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const swiperBreakpoints = {
    300: { slidesPerView: 1 },
    600: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1340: { slidesPerView: 5 },
  };
  return (
    <div className="py-30 bg-slate-800 text-white relative">
      <Container className="flex flex-col items-center text-center gap-20 w-full">
        <div className="flex flex-col gap-4 sm:gap-8">
          <h1 className="text-3xl sm:text-5xl">Popular styles right now</h1>
          <p className="text-gray-200">Make our most beloved looks your own.</p>
        </div>
        <div className="relative w-full px-6">
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={32}
            slidesPerView={1}
            className="w-full"
            loop
            breakpoints={swiperBreakpoints}
          >
            {[...Array(10)].map((_, i) => (
              <SwiperSlide key={i}>
                <div>
                  <img
                    src="https://suitshop.com/_next/image/?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1025%2F3059%2Ffiles%2FeDUMhQAbyUawYwVX7j2SDGat_DSzadoofUOkwQu7vaA_1440x2000_crop_center.jpg%3Fv%3D1724863128&w=640&q=75"
                    alt="Suit"
                    className="rounded-xl h-auto xl:h-100 w-full object-cover"
                  />

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm font-medium">
                      Men&apos;s Olive Green Suit
                    </p>
                    <span className="text-sm font-semibold">$378</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiper?.slidePrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black cursor-pointer p-4"
          >
            <FaAngleLeft size={30} />
          </button>

          <button
            onClick={() => swiper?.slideNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20  rounded-full bg-black cursor-pointer p-4"
          >
            <FaAngleRight size={30} />
          </button>
        </div>
      </Container>
    </div>
  );
}
