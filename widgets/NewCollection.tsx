"use client";

import { Container } from "@/components/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface NewCollectionListProps {
  products: Product[];
}

interface CollectionSectionProps {
  title: string;
  items: Product[];
  delay: number;
}

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

const CollectionSection = ({ title, items, delay }: CollectionSectionProps) => {
  if (!items.length) return null;

  return (
    <section className="mb-16 last:mb-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

        <button className="text-sm font-medium text-neutral-500 hover:text-black transition-colors">
          View all →
        </button>
      </div>

      <Swiper
        modules={[Autoplay]}
        className="w-full"
        breakpoints={breakpoints}
        loop
        autoplay={{
          delay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {items.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard card={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export const NewCollectionList = ({ products }: NewCollectionListProps) => {
  const collections = [
    {
      title: "Women's Collection",
      collection: "women-collection",
      delay: 4000,
    },
    {
      title: "Men's Collection",
      collection: "men-collection",
      delay: 5000,
    },
    {
      title: "Sunglasses",
      collection: "sunglasses-collection",
      delay: 6000,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <Container>
        <div className="mb-12 text-center">
          <span className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
            New Arrivals
          </span>

          <h1 className="text-[2.5rem] md:text-[4rem] font-bold mt-2 tracking-tight">
            New Collection
          </h1>

          <p className="text-neutral-500 mt-3 max-w-md mx-auto">
            Fresh seasonal arrivals
          </p>
        </div>

        {collections.map(({ title, collection, delay }) => (
          <CollectionSection
            key={collection}
            title={title}
            delay={delay}
            items={products.filter(
              (product) => product.collection === collection && product.isNew,
            )}
          />
        ))}
      </Container>
    </div>
  );
};
