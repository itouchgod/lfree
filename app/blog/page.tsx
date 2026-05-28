import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { PageHeader } from "@/components/page-header";
import { getBlogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on building calm macOS apps, privacy tools and focused workflows.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <PageHeader
        title="Blog"
        description="Notes from the lab on product design, privacy and practical software."
      />
      <section className="container pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
