import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { isAdmin } from "@/lib/session";
import LoginForm from "@/components/admin/LoginForm";
import ContentEditor from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <LoginForm />;
  }
  const content = await getContent();
  return <ContentEditor initialContent={content} />;
}
