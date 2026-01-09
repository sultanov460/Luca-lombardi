import Link from "next/link";

export const HeroCards = () => {
  const cards = [
    {
      id: 1,
      title: "Men's collection",
      imgHref:
        "https://www.fashionbeans.com/wp-content/uploads/2024/04/lucafaloni_manwithsunglasseswearinganavyblazerandjeans.jpg",
      href: "/men-collection",
    },
    {
      id: 2,
      title: "Women's collection",
      imgHref:
        "https://i.pinimg.com/564x/e6/3e/ef/e63eef54f74009dbb7709e24d26e35af.jpg",
      href: "/women-collection",
    },
    {
      id: 3,
      title: "Sunglasses collection",
      imgHref:
        "https://i.pinimg.com/564x/d2/5b/43/d25b43172c1daed4bb00678f7bc64d0a.jpg",
      href: "/sunglasses-collection",
    },
    {
      id: 4,
      title: "New collection",
      imgHref:
        "https://www.fashionbeans.com/wp-content/uploads/2024/04/lucafaloni_manwearingaskilcashmereblendzipupsweaterandscarf.jpg",
      href: "/new-collection",
    },
  ];
  return (
    <div className="grid grid-cols-1 py-20 mx-4 lg:grid-cols-2 lg:mx-12 gap-4">
      {cards.map((card) => (
        <div key={card.id} className="relative h-100 sm:h-175">
          <img
            src={card.imgHref}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-full text-white z-10 gap-1">
            <h1 className="font-semibold text-2xl sm:text-4xl">{card.title}</h1>
            <Link
              href={card.href}
              className="border border-white text-white w-max py-2 px-8 sm:px-20 sm:py-3 mt-10 font-semibold text-lg sm:text-xl cursor-pointer xl:hover:bg-white xl:hover:text-gray-600 transition-all duration-300"
            >
              Learn more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
