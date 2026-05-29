import Image from "next/image";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function SiteLogo({ size = 32, className, priority }: SiteLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="LFree"
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-[22%] object-cover", className)}
    />
  );
}
