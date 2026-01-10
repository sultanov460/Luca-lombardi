import { Container } from "@/components/Container";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
  const footerLinks = [
    {
      id: 1,
      title: "Company",
      links: [
        { id: 1, label: "Women", href: "/women-collection" },
        {
          id: 2,
          label: "Men",
          href: "/men-collection",
        },
        { id: 3, label: "New Arrivals", href: "new-arrivals" },
        { id: 4, label: "About", href: "/about" },
      ],
    },
    {
      id: 2,
      title: "Feedback",
      links: [
        { id: 1, label: "Contact us", href: "/contact-us" },
        { id: 2, label: "+1 (773) 303-6006", href: "tel:+17733036006" },
        { id: 3, label: "info@lombardi.com", href: "mailto:info@lombardi.com" },
      ],
    },
    {
      id: 3,
      title: "Legal",
      links: [
        { id: 1, label: "Terms of Service", href: "/terms-of-service" },
        { id: 2, label: "Privacy Policy", href: "/privacy-policy" },
        { id: 3, label: "Privacy Preferences", href: "/privacy-preferences" },
      ],
    },
  ];
  return (
    <div className="bg-slate-800 py-15 sm:py-30 px-5 text-white">
      <Container className="flex flex-col sm:flex-row sm:flex-wrap gap-10 justify-center text-center lg:flex-nowrap lg:justify-between lg:text-left">
        <div>
          <Link href={"/"} className="text-3xl font-bold tracking-wide">
            LUCA LOMBARDI
          </Link>
          <div className="flex items-center justify-center lg:justify-start gap-4 mt-7">
            <FaInstagram size={25} />
            <FaTelegram size={25} />
            <FaWhatsapp size={25} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-12 text-center sm:text-left">
          {footerLinks.map((column) => (
            <div key={column.id}>
              <h3 className="text-2xl mb-8 font-light">{column.title}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className="text-gray-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="text-2xl font-light">Subscribe to our newsletter!</h3>
          <p className="max-w-90">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, atque.
          </p>
          <form className="relative">
            <input
              type="text"
              className="bg-[#e5e5e5] p-3 w-full text-gray-700 outline-none"
              placeholder="Enter email adress"
            />
            <button className="absolute right-0 top-0 py-3 px-5 bg-black text-white cursor-pointer">
              SUBMIT
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};
