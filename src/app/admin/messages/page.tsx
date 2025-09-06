import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

type SearchParams = Promise<{ q?: string; cursor?: string; take?: string }>;

export default async function MessagesPage({ searchParams }: { searchParams: SearchParams }) {
  

  const session = await getServerSession();
  // If you added isAdmin:
  // if (!session || !(session.user as any)?.isAdmin) redirect("/api/auth/signin?callbackUrl=/admin/messages");
  if (!session) redirect("/api/auth/signin?callbackUrl=/admin/messages");

  // …render Prisma table
  const params = await searchParams;
  const q = (params.q || "").trim();
  const take = Math.min(Math.max(parseInt(params.take || "20", 10) || 20, 1), 100);

  // Cursor-based pagination
  const cursor = params.cursor || undefined;

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { message: { contains: q, mode: "insensitive" } },
        ],
      }
    : undefined;

  const items = await prisma.contactMessage.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: take + 1, // fetch one extra to know if there's a next page
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      createdAt: true,
      ip: true,
      userAgent: true,
      source: true,
    },
  });

  const hasNext = items.length > take;
  const data = hasNext ? items.slice(0, take) : items;
  const nextCursor = hasNext ? data[data.length - 1].id : undefined;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Contact Messages</h1>

      <form className="mb-4 flex items-center gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email, or message…"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark"
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-neutral-800">
            <tr>
              <th className="px-4 py-2 text-left">When</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Meta</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No messages yet.
                </td>
              </tr>
            ) : (
              data.map((m) => (
                <tr key={m.id} className="border-t border-gray-100 dark:border-neutral-800 align-top">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {m.createdAt.toISOString().replace("T", " ").slice(0, 16)}
                  </td>
                  <td className="px-4 py-3">{m.name}</td>
                  <td className="px-4 py-3">
                    <a className="text-primary hover:underline" href={`mailto:${m.email}`}>{m.email}</a>
                  </td>
                  <td className="px-4 py-3 whitespace-pre-wrap">{m.message}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {m.ip ? `IP: ${m.ip}` : ""}{m.ip && <br />}
                    {m.userAgent ? `UA: ${m.userAgent}` : ""}{m.userAgent && <br />}
                    {m.source ? `Src: ${m.source}` : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {data.length} {q ? "matching" : ""} message{data.length === 1 ? "" : "s"}
        </div>
        <div className="flex gap-2">
          {cursor && (
            <a
              className="btn"
              href={`/admin/messages?${new URLSearchParams({ q, take: String(take) }).toString()}`}
            >
              Reset
            </a>
          )}
          {hasNext && (
            <a
              className="btn btn-primary"
              href={`/admin/messages?${new URLSearchParams({
                q,
                take: String(take),
                cursor: nextCursor!,
              }).toString()}`}
            >
              Next →
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
