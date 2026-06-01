import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";
import type { ContentItem } from "@/lib/content";

interface BlogCardProps {
  post: ContentItem;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full transition-all hover:border-primary/30">
        <CardHeader>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.frontmatter.date)}
            {post.frontmatter.category && (
              <span className="before:mx-2 before:content-['·']">
                {post.frontmatter.category}
              </span>
            )}
          </p>
          <CardTitle className="group-hover:text-primary transition-colors">
            {post.frontmatter.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.frontmatter.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
