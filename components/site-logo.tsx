import Image from "next/image";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function SiteLogo({ size = 32, className, priority }: SiteLogoProps) {
  const width = Math.round(size * 3.18);

  return (
    <Image
      src="/brand/lfreelogo.png"
      alt="LFree"
      width={width}
      height={size}
      preload={priority}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      className={cn(
        "object-contain opacity-100 [filter:invert(1)_hue-rotate(180deg)_saturate(1.35)_brightness(1.45)_contrast(1.05)_drop-shadow(0_0_18px_rgba(34,211,238,0.28))]",
        className
      )}
    />
  );
}
