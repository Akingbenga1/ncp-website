import { StubPage, stubMetadata } from "@/components/StubPage";

export const metadata = stubMetadata(
  "Market",
  "Business and community directory for Nigerian Community Peterborough.",
);

export default function MarketPage() {
  return (
    <StubPage
      kicker="Directory"
      title="Market"
      lead="An approved directory of Nigerian-owned and Nigerian-serving businesses and community groups in Peterborough and the surrounding area."
    />
  );
}
