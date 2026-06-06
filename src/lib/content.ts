import { list, put } from "@vercel/blob";
import type { SiteContent } from "@/types";
import { defaultContent } from "./defaultContent";

const CONTENT_KEY = "content.json";

export async function getContent(): Promise<SiteContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return defaultContent;
  try {
    const { blobs } = await list({ prefix: CONTENT_KEY, limit: 1 });
    if (blobs.length === 0) return defaultContent;
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) throw new Error(`blob fetch failed: ${res.status}`);
    return (await res.json()) as SiteContent;
  } catch (error) {
    console.error("getContent falling back to default:", error);
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  await put(CONTENT_KEY, JSON.stringify(content), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
