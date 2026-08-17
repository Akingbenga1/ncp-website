import { StubPage, stubMetadata } from "@/components/StubPage";

export const metadata = stubMetadata(
  "Donation",
  "Support Nigerian Community Peterborough with a one-off or monthly donation.",
);

export default function DonationPage() {
  return (
    <StubPage
      kicker="Support NCP"
      title="Donation"
      lead="Card donations and bank transfer details will live on this page. Giving will be wired through the payment port — never a disabled button."
    />
  );
}
