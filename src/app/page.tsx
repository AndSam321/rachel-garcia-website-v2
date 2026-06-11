import Desktop from "@/components/Desktop";
import { getContent } from "@/lib/content";
import { encodeEmail } from "@/lib/emailObfuscation";
import type { SiteContent } from "@/types";

export const dynamic = "force-dynamic";

function obfuscateEmails(content: SiteContent): SiteContent {
  return {
    ...content,
    contacts: content.contacts.map((c) =>
      c.kind === "email"
        ? {
            ...c,
            label: encodeEmail(c.label),
            href: encodeEmail(c.href.replace(/^mailto:/, "")),
          }
        : c,
    ),
  };
}

export default async function Home() {
  const content = await getContent();
  return <Desktop content={obfuscateEmails(content)} />;
}
