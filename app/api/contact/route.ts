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

  const html = `
  <div style="margin:0;padding:24px;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="max-width:92%;background:#ffffff;border-radius:14px;
            box-shadow:0 8px 25px rgba(0,0,0,.08);overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="padding:20px 24px;background:#111827;color:#ffffff;">
                <h2 style="margin:0;font-size:20px;">New Contact Message</h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:20px 24px;color:#111827;">
                <p style="margin:0 0 10px 0;"><strong>Name:</strong> ${body.name}</p>
                <p style="margin:0 0 10px 0;">
                  <strong>Email:</strong>
                  <a href="mailto:${body.email}" style="color:#2563eb;text-decoration:none;">
                    ${body.email}
                  </a>
                </p>
                <p style="margin:0 0 10px 0;"><strong>Phone:</strong> ${body.phone}</p>

                <p style="margin:16px 0 6px 0;font-weight:600;">Message:</p>
                <div style="padding:12px;border:1px solid #e5e7eb;border-radius:10px;
                            background:#fafafa;line-height:1.5;">
                  ${body.message}
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:14px 24px;background:#f9fafb;color:#6b7280;font-size:12px;">
                Sent from your website
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${body.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${body.name} (${body.email})`,
      html,
      replyTo: body.email,
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
