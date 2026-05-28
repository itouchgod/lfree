export default function Loading() {
  return (
    <div className="container flex min-h-[40vh] items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-pulse rounded-full bg-primary/30" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
