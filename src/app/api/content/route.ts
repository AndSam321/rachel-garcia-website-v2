import { saveContent } from "@/lib/content";
import { isAdmin } from "@/lib/session";
import type { SiteContent } from "@/types";

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const content = (await request.json()) as SiteContent;
  if (!content?.bio || !content?.contacts || !content?.projects || !content?.resume) {
    return Response.json({ error: "malformed content" }, { status: 422 });
  }
  await saveContent(content);
  return Response.json({ ok: true });
}
