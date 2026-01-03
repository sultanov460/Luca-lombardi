import clsx from "clsx";
import { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  id?: string;
}

export const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div className={clsx("max-w-375 mx-auto px-3", className)} id={id || ""}>
      {children}
    </div>
  );
};
