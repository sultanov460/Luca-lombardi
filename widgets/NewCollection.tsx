"use client";

import { Container } from "@/components/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface NewCollectionListProps {
  title: string;
  collections: Product[];
  delay: number;
}

export default function NewCollectionList({
  title,
  delay,
  collections,
}: NewCollectionListProps) {
  const newCollections = collections.filter((item) => item.isNew);

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  return (
    <Container className="w-full min-w-0 py-12 sm:py-14 lg:py-18">
      <h3 className="mb-8 text-2xl font-semibold sm:mb-10">{title}</h3>

      <Swiper
        modules={[Autoplay]}
        className="w-full min-w-0"
        slidesPerView={1}
        spaceBetween={12}
        breakpoints={breakpoints}
        loop
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
      >
        {newCollections.map((collection) => (
          <SwiperSlide key={collection.id}>
            <ProductCard card={collection} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
