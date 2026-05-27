import type { Metadata } from "next";
import { VisualProphecyComingSoon } from "@/components/visual-prophecy-coming-soon";

export const metadata: Metadata = {
  title: "7 Trumpets Coming Soon",
  description: "Coming soon page for the seven trumpets visual prophecy study."
};

export default function SevenTrumpetsComingSoonPage() {
  return (
    <VisualProphecyComingSoon
      title="7 Trumpets"
      reference="Revelation 8-11"
      description="The interactive visual study for the seven trumpets is not ready yet. This page will hold the visual sequence once the data is prepared."
    />
  );
}
