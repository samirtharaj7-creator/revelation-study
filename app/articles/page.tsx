import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "Revelation articles on interpretive methods, Daniel connections, prophetic symbols, final events, and the hope of the Lamb."
};

const categories = [
  "Reading Revelation",
  "Daniel and Revelation",
  "Throne, Seals, and Trumpets",
  "Final Conflict and Restoration"
] as const;

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="articles-page">
      <section className="articles-hero">
        <div className="articles-hero-copy">
          <p className="articles-kicker">
            <BookOpenText className="h-5 w-5" />
            Revelation Articles
          </p>
          <h1>Study the larger questions behind the visions.</h1>
          <p>
            Clear articles on Revelation&apos;s interpretive methods, symbols, sanctuary scenes,
            prophetic flow, final conflict, and restoration.
          </p>
        </div>
        <nav className="articles-menu" aria-label="Article categories">
          {categories.map((category) => (
            <a key={category} href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              {category}
            </a>
          ))}
        </nav>
      </section>

      <section className="articles-index" aria-label="Article list">
        {categories.map((category) => {
          const categoryArticles = articles.filter((article) => article.category === category);
          return (
            <section
              key={category}
              id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="articles-category"
              aria-labelledby={`${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}
            >
              <div className="articles-category-heading">
                <p>Category</p>
                <h2 id={`${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>{category}</h2>
              </div>

              <div className="articles-card-grid">
                {categoryArticles.map((article) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="article-card">
                    <span>{article.readingTime}</span>
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                    <div className="article-card-tags" aria-label={`${article.title} tags`}>
                      {article.tags.slice(0, 3).map((tag) => (
                        <em key={tag}>{tag}</em>
                      ))}
                    </div>
                    <strong>
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </strong>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}
