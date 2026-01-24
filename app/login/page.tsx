"use client";
import { Container } from "@/components/Container";
import { signSchema } from "@/schemas/sign";
import { LoginFormData } from "@/types/login";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import z from "zod";

interface ErrorsState {
  email: string | null;
  password: string | null;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({
    email: null,
    password: null,
  });

  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  }

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = signSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);

      const fieldErrors = flattened.fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] || null,
        password: fieldErrors.password?.[0] || null,
      });

      return;
    }

    const validatedData = result.data;

    setErrorMessage(null);
  }

  return (
    <div className="pt-20 pb-30">
      <Container>
        <form
          onSubmit={handleLogin}
          className="gird grid-cols-1 gap-5 shadow-2xl rounded-3xl p-8 w-full sm:w-150 mx-auto"
        >
          <h1 className="text-4xl tracking-[2px] text-center mb-5">Sign In</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col relative">
              <input
                type="email"
                placeholder="Email"
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none"
                onChange={handleChange}
                value={formData.email}
                name="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col relative">
              <input
                type={show ? "password" : "text"}
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
              <button
                className="absolute top-3 right-5 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                {show ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <label className="text-sm">Remember me</label>
              </div>
              <Link
                href={"/forgot-password"}
                className="text-sky-500 xl:hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button className="bg-black text-white font-medium tracking-[2px] py-3 rounded-3xl cursor-pointer">
              Login
            </button>
            <span className="text-sm mx-auto">
              Don&apos;t have an account{" "}
              <Link
                href={"/signup"}
                className="text-sky-500 xl:hover:underline ml-1"
              >
                Create an account now
              </Link>{" "}
            </span>
          </div>
        </form>
      </Container>
    </div>
  );
}
