import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs"; // Prisma + Resend need Node (not edge)

const resend = new Resend(process.env.RESEND_API_KEY);

const Body = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  // optional honeypot to catch bots (your form can include a hidden input named "company")
  company: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Body.parse(json);

    // Honeypot: if "company" is filled, silently accept but don't do anything
    if (parsed.company && parsed.company.trim().length > 0) {
      return NextResponse.json({ message: "Message received" }, { status: 200 });
    }

    const ip = req.headers.get("x-forwarded-for") ?? undefined;
    const userAgent = req.headers.get("user-agent") ?? undefined;
    const referer = req.headers.get("referer") ?? undefined;

    // 1) Save to DB
    const saved = await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
        ip,
        userAgent,
        source: referer ?? undefined,
      },
    });

    // 2) Send email (await so you see errors; you can make this fire-and-forget if you prefer)
    const toList = (process.env.RESEND_TO ?? "").split(",").map(s => s.trim()).filter(Boolean);
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: toList.length ? toList : ["you@example.com"],
      replyTo: parsed.email, // makes “Reply” go to the sender
      subject: `New contact from ${parsed.name}`,
      text:
`New contact message

Name: ${parsed.name}
Email: ${parsed.email}

Message:
${parsed.message}

Meta:
IP: ${ip ?? "-"}
UA: ${userAgent ?? "-"}
Ref: ${referer ?? "-"}
ID: ${saved.id}
`,
    });

    return NextResponse.json({ message: "Message received", id: saved.id }, { status: 200 });
  } catch (err) {
    console.error(err);
    // zod validation errors → 400
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: err.flatten() }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to process" }, { status: 500 });
  }
}
