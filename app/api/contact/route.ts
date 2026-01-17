import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: body.email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${body.name} (${body.email})`,
      html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${body.message}</p>
    `,
    });

    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 },
    );
  }
}

// fetch('/api/contact') -> CLIENT
// fetch('http://localhost:3000/api/contact') -> SERVER
