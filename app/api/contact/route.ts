export async function POST(req: Request) {
  const body = await req.json();

  const { name, contact, plan, message } = body;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

  const text = `
📩 ახალი მოთხოვნა

👤 სახელი: ${name}
📧 Contact: ${contact}
📦 პაკეტი: ${plan}
💬 მესიჯი:

${message}
  `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
    }),
  });

  return Response.json({ success: true });
}