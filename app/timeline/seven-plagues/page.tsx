import type { Metadata } from "next";
import { VisualProphecyComingSoon } from "@/components/visual-prophecy-coming-soon";

export const metadata: Metadata = {
  title: "7 Plagues Coming Soon",
  description: "Coming soon page for the seven plagues visual prophecy study."
};

export default function SevenPlaguesComingSoonPage() {
  return (
    <VisualProphecyComingSoon
      title="7 Plagues"
      reference="Revelation 15-16"
      description="The interactive visual study for the seven last plagues is not ready yet. This page will hold the visual sequence once the data is prepared."
    />
  );
}
