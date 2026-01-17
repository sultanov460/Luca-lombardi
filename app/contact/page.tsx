"use client";
import { Container } from "@/components/Container";
import { ContactFormData, contactSchema } from "@/schemas/contact";
import { ChangeEvent, FormEvent, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import z from "zod";

interface ErrorsState {
  email: string | null;
  name: string | null;
  message: string | null;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({
    name: null,
    email: null,
    message: null,
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: null });
  }



  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);

      const fieldErrors = flattened.fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] || null,
        email: fieldErrors.email?.[0] || null,
        message: fieldErrors.message?.[0] || null,
      });

      return;
    }

    const validatedData = result.data;
    console.log(validatedData);
  }
  return (
    <div>
      <div className="flex flex-col items-center text-center gap-5 pt-20">
        <h1 className="text-4xl font-semibold">Get In Touch With Us!</h1>
        <p className="max-w-150">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          aspernatur blanditiis earum expedita nobis qui repellendus tenetur
          unde ut voluptate.
        </p>
      </div>
      <div className="pt-15 pb-30">
        <Container>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-8 shadow-2xl rounded-3xl p-8 w-full lg:w-140 mx-auto
          "
          >
            <div className="flex flex-col relative col-span-2 lg:col-span-1">
              <input
                type="text"
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none"
                placeholder="Enter your name..."
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <PhoneInput
              onlyCountries={["az"]}
              country={"az"}
              value={formData.phone}
              onChange={(value) =>
                setFormData({ ...formData, phone: `+${value}` })
              }
              placeholder="Enter your phone number..."
            />

            <div className="flex flex-col relative col-span-2">
              <input
                type="email"
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <textarea
                value={formData.message}
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl h-40 outline-none resize-none"
                onChange={handleChange}
                placeholder="Enter your message..."
                name="message"
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message}</span>
              )}
            </div>
            <button className="bg-black text-white font-medium tracking-[2px] py-3 rounded-3xl cursor-pointer">
              Send
            </button>
          </form>
        </Container>
      </div>
    </div>
  );
}
