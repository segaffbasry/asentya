import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asentya article editor",
  robots: { index: false, follow: false },
};

export default function ArticleEditor() {
  redirect("https://app.pagescms.org");
}
