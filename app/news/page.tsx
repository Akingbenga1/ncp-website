import { StubPage, stubMetadata } from "@/components/StubPage";

export const metadata = stubMetadata(
  "News",
  "News and updates from Nigerian Community Peterborough.",
);

export default function NewsPage() {
  return (
    <StubPage
      kicker="Updates"
      title="News"
      lead="Articles and announcements from NCP will be published here. Content will be managed through the CMS — no placeholder filler."
    />
  );
}
