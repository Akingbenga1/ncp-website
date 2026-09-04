import type { PixabayCredit } from "@/data/pixabay-credits";

type CommunityPhotoProps = {
  credit: PixabayCredit;
  className?: string;
  priority?: boolean;
  /** Intrinsic size for CLS; defaults match common landscape community assets. */
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
    <img
      src={credit.file}
      alt={credit.alt}
      className={`community-photo ${className}`.trim()}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
