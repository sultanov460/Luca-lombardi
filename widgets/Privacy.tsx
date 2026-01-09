import { Container } from "@/components/Container";
import { MdSecurity } from "react-icons/md";

export const Privacy = () => {
  return (
    <div className="py-20 bg-slate-50">
      <Container className="flex flex-wrap justify-center gap-16 items-center lg:justify-around lg:gap-0">
        <div className="flex flex-col gap-2 items-center text-center">
          <MdSecurity size={50} />
          <p className="max-w-65 text-lg font-medium">
            Verified transactions protect your privacy and security
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center text-center">
          <MdSecurity size={50} />
          <p className="max-w-65 text-lg font-medium">
            Verified transactions protect your privacy and security
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center text-center">
          <MdSecurity size={50} />
          <p className="max-w-65 text-lg font-medium">
            Verified transactions protect your privacy and security
          </p>
        </div>
      </Container>
    </div>
  );
};
