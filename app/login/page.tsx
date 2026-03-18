import { LoginForm } from "@/widgets/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}
