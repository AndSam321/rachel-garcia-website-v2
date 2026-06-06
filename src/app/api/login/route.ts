import { createHash, timingSafeEqual } from "crypto";
import { getSession } from "@/lib/session";

function matches(candidate: string, actual: string) {
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(actual).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string" || !matches(password, expected)) {
    return Response.json({ error: "wrong password" }, { status: 401 });
  }
  const session = await getSession();
  session.admin = true;
  await session.save();
  return Response.json({ ok: true });
}
