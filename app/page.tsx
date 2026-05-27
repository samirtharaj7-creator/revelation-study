import { HeroSection } from "@/components/hero-section";
import { getAllChapters } from "@/lib/content";

export default function HomePage() {
  const chapters = getAllChapters();
  return (
    <main>
      <HeroSection chapters={chapters} />
    </main>
  );
}
