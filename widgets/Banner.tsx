import { Container } from "@/components/Container";

interface BannerProps {
  title: string;
  description: string;
  bgClass: string;
}

export default function Banner({ title, description, bgClass }: BannerProps) {
  return (
    <div className={`${bgClass} text-[#f6f6f6]`}>
      <Container className="flex flex-col items-center text-center sm:text-left sm:items-start gap-8 justify-center h-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p>{description}</p>
      </Container>
    </div>
  );
}
