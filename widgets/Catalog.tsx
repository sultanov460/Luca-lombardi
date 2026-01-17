"use client";

import { Container } from "@/components/Container";
import Link from "next/link";
import { useState } from "react";

interface CatalogProps {
    catalogData: { id: number; title: string; src: string; price: string }[];
}

export const Catalog = ({ catalogData }: CatalogProps) => {

    const [showMore, setShowMore] = useState(4);
    return (
        <div className="py-30">
            <Container className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                            onClick={() => setShowMore(showMore + 4)}
                            className="bg-black rounded-3xl border border-transparent text-white font-medium text-lg py-3 px-8 block mx-auto mt-15 cursor-pointer xl:hover:bg-transparent xl:hover:border-black xl:hover:text-black transition-all duration-300
      "
                        >
                            Load More
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowMore(4)}
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
