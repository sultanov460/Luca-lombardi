import { Metadata } from "next";
import { LoginForm } from "@/widgets/LoginForm";

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
