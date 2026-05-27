import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="article-reader">
      <article className="article-document">
        <Link href="/articles" className="article-back-link">
          <ArrowLeft className="h-4 w-4" />
          Articles
        </Link>

        <header className="article-document-header">
          <p className="articles-kicker">{article.category}</p>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          <div className="article-meta">
            <span>{article.readingTime}</span>
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className="article-body">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="article-section">
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.scriptureReferences.length ? (
                <div className="article-scripture-list" aria-label={`${section.title} Scripture references`}>
                  {section.scriptureReferences.map((reference) => (
                    <span key={reference}>{reference}</span>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <section className="article-why">
            <h2>Why This Matters</h2>
            {article.whyThisMatters.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="article-scripture-list" aria-label="Why this matters Scripture references">
              {article.whyThisMatters.scriptureReferences.map((reference) => (
                <span key={reference}>{reference}</span>
              ))}
            </div>
          </section>
        </div>
      </article>

      <aside className="article-related" aria-label="Related study links">
        <p className="articles-kicker">Related Study</p>
        <div className="article-related-list">
          {article.relatedLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <strong>{link.title}</strong>
              <span>{link.description}</span>
              <em>
                Open
                <ArrowRight className="h-4 w-4" />
              </em>
            </Link>
          ))}
        </div>
      </aside>
    </main>
  );
}
