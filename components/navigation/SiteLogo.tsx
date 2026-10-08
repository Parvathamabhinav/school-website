import Image from "next/image";
import Link from "next/link";
import type { ImageAsset } from "@/types/media";
import { cn } from "@/lib/utils/cn";

interface SiteLogoProps {
  name: string;
  logo?: ImageAsset;
  className?: string;
}

/**
 * Home link with the school's identity: its logo when one is configured,
 * otherwise a typographic wordmark set in the display face.
 */
export function SiteLogo({ name, logo, className }: SiteLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center motion-colors hover:text-text-muted", className)}>
      {logo ? (
        <Image
          src={logo.src}
          alt={logo.alt || name}
          width={logo.width}
          height={logo.height}
          preload
          className="h-8 w-auto md:h-10"
        />
      ) : (
        <span className="font-display text-h4 font-medium tracking-tight whitespace-nowrap">{name}</span>
      )}
    </Link>
  );
}
