import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/session";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "no file" }, { status: 422 });
  }
  const blob = await put(`uploads/${file.name}`, file, { access: "public" });
  return Response.json({ url: blob.url });
}
