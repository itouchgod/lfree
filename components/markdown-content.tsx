import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-12 border-t border-border/50 pt-10 text-2xl font-semibold tracking-tight text-foreground first:mt-0 first:border-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="doc-ul mb-6 space-y-3">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-3 pl-6 marker:text-primary">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-7 text-muted-foreground">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    const className =
      "font-medium text-primary underline-offset-4 transition-colors hover:underline";

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={className}>
        {children}
      </Link>
    );
  },
  table: ({ children }) => (
    <div className="mb-8 overflow-hidden rounded-xl border border-border/60 bg-card/40">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border/60 bg-muted/50 text-foreground">
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-border/40">{children}</tbody>,
  tr: ({ children }) => <tr className="transition-colors hover:bg-muted/20">{children}</tr>,
  th: ({ children }) => (
    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-5 py-4 align-middle text-muted-foreground">{children}</td>
  ),
  hr: () => <hr className="my-10 border-border/40" />,
  blockquote: ({ children }) => (
    <blockquote className="mb-6 rounded-xl border-l-2 border-primary bg-primary/5 px-5 py-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        "doc-content max-w-none text-base",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
