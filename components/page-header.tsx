interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="container py-10 md:py-12">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        {description && (
          <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
