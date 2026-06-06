import Desktop from "@/components/Desktop";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return <Desktop content={content} />;
}
