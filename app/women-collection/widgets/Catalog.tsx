"use client";

import { Container } from "@/components/Container";
import Link from "next/link";
import { useState } from "react";

export const Catalog = () => {
  const catalogData = [
    { id: 1, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 2, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 3, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 4, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 5, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 6, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 7, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 8, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 9, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
    { id: 10, title: "Quiet Luxury", src: "women.jpeg", price: "557$" },
  ];

  const [showMore, setShowMore] = useState(6);
  return (
    <div className="py-30">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {catalogData.slice(0, showMore).map((card) => (
          <Link
            key={card.id}
            href={""}
            className="flex flex-col items-center justify-center text-center max-w-85 mx-auto"
          >
            <img
              src={card.src}
              alt={card.title}
              className="h-auto xl:h-100 object-cover rounded-xl w-full shadow-2xl"
            />
            <div className="flex items-center justify-between mt-4 w-full px-2">
              <h2>{card.title}</h2>
              <span className="text-sm">{card.price}</span>
            </div>
          </Link>
        ))}
      </Container>
      {catalogData.length > 6 && (
        <div>
          {showMore < catalogData.length ? (
            <button
              onClick={() => setShowMore(showMore + 3)}
              className="bg-black rounded-3xl border border-transparent text-white font-medium text-lg py-3 px-8 block mx-auto mt-15 cursor-pointer xl:hover:bg-transparent xl:hover:border-black xl:hover:text-black transition-all duration-300
      "
            >
              Load More
            </button>
          ) : (
            <button
              onClick={() => setShowMore(6)}
              className="bg-black rounded-3xl border border-transparent text-white font-medium text-lg py-3 px-8 block mx-auto mt-15 cursor-pointer xl:hover:bg-transparent xl:hover:border-black xl:hover:text-black transition-all duration-300
      "
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};
