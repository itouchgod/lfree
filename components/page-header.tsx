interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="container py-16 md:py-20">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
