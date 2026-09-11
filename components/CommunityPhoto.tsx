import type { PixabayCredit } from "@/data/pixabay-credits";
import { cn } from "@/lib/cn";

type CommunityPhotoProps = {
  credit: PixabayCredit;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export function CommunityPhoto({
  credit,
  className = "",
  priority = false,
  width = 1200,
  height = 900,
}: CommunityPhotoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={credit.file}
      alt={credit.alt}
      className={cn("h-full w-full object-cover", className)}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
