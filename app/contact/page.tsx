"use client";
import { Container } from "@/components/Container";
import { ContactFormData, contactSchema } from "@/schemas/contact";
import { ChangeEvent, FormEvent, useState } from "react";
import PhoneInput from "react-phone-input-2";
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

  console.log(errors);

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
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none"
                placeholder="Enter your name..."
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div>
              <PhoneInput
                onlyCountries={["az"]}
                country={"az"}
                placeholder="Enter your phone number..."
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div>
              <textarea
                value={formData.message}
                onChange={handleChange}
                name="message"
              ></textarea>
            </div>
            <button>Send</button>
          </form>
        </Container>
      </div>
    </div>
  );
}
