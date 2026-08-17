import { StubPage, stubMetadata } from "@/components/StubPage";

export const metadata = stubMetadata(
  "Events",
  "Community events from Nigerian Community Peterborough.",
);

export default function EventsPage() {
  return (
    <StubPage
      kicker="What's on"
      title="Events"
      lead="Upcoming gatherings, celebrations, and community meet-ups will appear here. Admins will publish dates, venues, and details from the CMS."
    />
  );
}
