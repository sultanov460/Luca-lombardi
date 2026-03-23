import { SignupForm } from "@/widgets/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

export default function Signup() {
  return <SignupForm />;
}
