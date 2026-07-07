import nodemailer from "nodemailer";

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

interface OrderEmailItem {
  title: string;
  sizeLabel: string;
  quantity: number;
  unitPriceCents: number;
}

interface OrderEmailData {
  orderId: string;
  items: OrderEmailItem[];
  totalCents: number;
}

function buildItemsRows(items: OrderEmailItem[]) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${item.title}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:center;">${item.sizeLabel}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:right;">$${(
            (item.unitPriceCents * item.quantity) /
            100
          ).toFixed(2)}</td>
        </tr>`,
    )
    .join("");
}

function buildOrderEmailHtml(
  heading: string,
  introText: string,
  accentColor: string,
  order: OrderEmailData,
) {
  return `
  <div style="margin:0;padding:24px;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="max-width:92%;background:#ffffff;border-radius:14px;
            box-shadow:0 8px 25px rgba(0,0,0,.08);overflow:hidden;">

            <tr>
              <td style="padding:20px 24px;background:${accentColor};color:#ffffff;">
                <h2 style="margin:0;font-size:20px;">${heading}</h2>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px;color:#111827;">
                <p style="margin:0 0 16px 0;">${introText}</p>
                <p style="margin:0 0 16px 0;">
                  <strong>Order #${order.orderId.slice(0, 8)}</strong>
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                  <thead>
                    <tr>
                      <td style="padding:8px 0;border-bottom:2px solid #111827;font-weight:600;">Item</td>
                      <td style="padding:8px 0;border-bottom:2px solid #111827;font-weight:600;text-align:center;">Size</td>
                      <td style="padding:8px 0;border-bottom:2px solid #111827;font-weight:600;text-align:center;">Qty</td>
                      <td style="padding:8px 0;border-bottom:2px solid #111827;font-weight:600;text-align:right;">Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    ${buildItemsRows(order.items)}
                  </tbody>
                </table>

                <p style="margin:16px 0 0 0;text-align:right;font-size:16px;">
                  <strong>Total: $${(order.totalCents / 100).toFixed(2)}</strong>
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 24px;background:#f9fafb;color:#6b7280;font-size:12px;">
                Luca Lombardi
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
}

export async function sendOrderConfirmationEmail(
  to: string,
  order: OrderEmailData,
) {
  const html = buildOrderEmailHtml(
    "Payment confirmed",
    "Thank you for your order! We've received your payment and your order is now being processed.",
    "#111827",
    order,
  );

  await transporter.sendMail({
    from: `"Luca Lombardi" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Order confirmed — #${order.orderId.slice(0, 8)}`,
    html,
  });
}

export async function sendOrderCancelledEmail(
  to: string,
  order: OrderEmailData,
) {
  const html = buildOrderEmailHtml(
    "Order cancelled",
    "Your order has been cancelled as requested. No payment was charged.",
    "#7f1d1d",
    order,
  );

  await transporter.sendMail({
    from: `"Luca Lombardi" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Order cancelled — #${order.orderId.slice(0, 8)}`,
    html,
  });
}
