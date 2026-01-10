"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Container } from "@/components/Container";
import { Navigation } from "swiper/modules";

const products = Array.from({ length: 6 });

export default function ProductSwiper() {
  return (
    <div className="py-30 bg-slate-800 text-white relative">
      <Container className="flex flex-col items-center text-center gap-20 w-full">
        <div>
          <h1 className="text-3xl sm:text-5xl">Popular styles right now</h1>
          <p className="text-gray-200">Make our most beloved looks your own.</p>
        </div>
        <div className="relative w-full px-6">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={32}
            slidesPerView={1.2}
            centeredSlides
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {products.map((_, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <img
                    src="https://suitshop.com/_next/image/?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1025%2F3059%2Ffiles%2FeDUMhQAbyUawYwVX7j2SDGat_DSzadoofUOkwQu7vaA_1440x2000_crop_center.jpg%3Fv%3D1724863128&w=640&q=75"
                    alt="Suit"
                    className="rounded-xl h-auto xl:h-100 w-full object-cover"
                  />

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm font-medium">
                      Men's Olive Green Suit
                    </p>
                    <span className="text-sm font-semibold">$378</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            ←
          </button>

          <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            →
          </button>
        </div>
      </Container>
    </div>
  );
}
