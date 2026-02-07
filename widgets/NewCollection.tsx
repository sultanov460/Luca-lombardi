"use client";

import { Container } from "@/components/Container";
import type { CatalogProps } from "@/types/catalogData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export const NewCollectionList = ({
  menCollection,
  womenCollection,
}: CatalogProps) => {
  const menNew = menCollection.filter((item) => item.isNew);
  const womenNew = womenCollection.filter((item) => item.isNew);

  return (
    <div className="py-12">
      <Container className="text-lg text-neutral-600 font-medium">
        {/* MEN */}
        <div className="mb-14">
          <h1 className="mb-4 text-neutral-900">For Men</h1>

          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3.1 },
            }}
            className="new-swiper"
          >
            {menNew.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  href={`${item.collection}/${item.id}`}
                  className="group relative"
                >
                  <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-neutral-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                      draggable={false}
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                    <p className="absolute left-3 top-3 rounded-full bg-orange-600 px-3 py-1 text-sm text-white">
                      NEW
                    </p>
                  </div>
                  <h1 className="mt-3 text-base font-medium text-neutral-900 transition-colors duration-300 group-hover:text-neutral-700">
                    {item.title}
                  </h1>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <h1 className="mb-4 text-neutral-900">For Women</h1>
          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3.1 },
            }}
            className="new-swiper"
          >
            {womenNew.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  href={`${item.collection}/${item.id}`}
                  className="group relative"
                >
                  <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-neutral-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                      draggable={false}
                      loading="lazy"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

                    <p className="absolute left-3 top-3 rounded-full bg-orange-600 px-3 py-1 text-sm text-white">
                      NEW
                    </p>
                  </div>

                  <h1 className="mt-3 text-base font-medium text-neutral-900 transition-colors duration-300 group-hover:text-neutral-700">
                    {item.title}
                  </h1>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      <style jsx global>{`
        .new-swiper {
          padding-bottom: 34px;
        }
        .new-swiper .swiper-pagination {
          bottom: 0px !important;
        }
        .new-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          opacity: 1;
          background: rgb(212, 212, 212);
        }
        .new-swiper .swiper-pagination-bullet-active {
          background: rgb(23, 23, 23);
        }
      `}</style>
    </div>
  );
};
