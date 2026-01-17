"use client";
import { Container } from "@/components/Container";
import { LoginFormData } from "@/types/login";
import { ChangeEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Signup() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const [show, setShow] = useState(true);
  return (
    <div className="pt-20 pb-30">
      <Container>
        <form className="gird grid-cols-1 gap-5 shadow-2xl rounded-3xl p-8 w-full sm:w-150 mx-auto">
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
            </div>
            <div className="flex flex-col relative">
              <input
                type={show ? "password" : "text"}
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />
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
            </div>
            <button className="bg-black text-white font-medium tracking-[2px] py-3 rounded-3xl cursor-pointer">
              Login
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
