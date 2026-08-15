import { prisma } from '@/lib/db';
import { after, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs'; // Prisma + Resend need Node (not edge)

const resend = new Resend(process.env.RESEND_API_KEY);

const Body = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  // Optional honeypot to catch bots.
  company: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Body.parse(json);

    // Silently accept honeypot submissions without sending or storing them.
    if (parsed.company && parsed.company.trim().length > 0) {
      return NextResponse.json(
        { message: 'Message received' },
        { status: 200 },
      );
    }

    const ip = req.headers.get('x-forwarded-for') ?? undefined;
    const userAgent = req.headers.get('user-agent') ?? undefined;
    const referer = req.headers.get('referer') ?? undefined;

    // Email delivery is the primary operation. A database outage must not prevent it.
    const from = process.env.RESEND_FROM;
    const toList = (process.env.RESEND_TO ?? '')
      .split(',')
      .map((address) => address.trim())
      .filter(Boolean);

    if (!from || toList.length === 0) {
      throw new Error('Missing RESEND_FROM or RESEND_TO configuration');
    }

    const { error: emailError } = await resend.emails.send({
      from,
      to: toList,
      replyTo: parsed.email,
      subject: `New contact from ${parsed.name}`,
      text: `New contact message

Name: ${parsed.name}
Email: ${parsed.email}

Message:
${parsed.message}

Meta:
IP: ${ip ?? '-'}
UA: ${userAgent ?? '-'}
Ref: ${referer ?? '-'}
`,
    });

    if (emailError) {
      throw new Error(`Resend failed: ${emailError.message}`);
    }

    // Supabase is an optional archive. Save after responding so a paused database
    // cannot delay the visitor or turn a successful email into a form error.
    after(async () => {
      try {
        await prisma.contactMessage.create({
          data: {
            name: parsed.name,
            email: parsed.email,
            message: parsed.message,
            ip,
            userAgent,
            source: referer,
          },
        });
      } catch (dbError) {
        // eslint-disable-next-line no-console
        console.error('Optional contact-message backup failed:', dbError);
      }
    });

    return NextResponse.json({ message: 'Message received' }, { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', errors: err.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: 'Failed to process' }, { status: 500 });
  }
}
