import { StubPage, stubMetadata } from "@/components/StubPage";

export const metadata = stubMetadata(
  "Search",
  "Search events, news, and directory listings from Nigerian Community Peterborough.",
);

export default function SearchPage() {
  return (
    <StubPage
      kicker="Find"
      title="Search"
      lead="Search across events, news, and Market listings will connect through the search port once content is available."
    />
  );
}
