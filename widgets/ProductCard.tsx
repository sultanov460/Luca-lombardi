import { CatalogItem } from "@/types/catalogData";
import Link from "next/link";

interface Props {
  card: CatalogItem;
}

//salam
export const ProductCard = ({ card }: Props) => {
  return (
    <Link
      key={card.id}
      href={`/${card.collection}/${card.id}`}
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
  );
};
