import type { PixabayCredit } from "@/data/pixabay-credits";

type CommunityPhotoProps = {
  credit: PixabayCredit;
  className?: string;
  priority?: boolean;
};

export function CommunityPhoto({
  credit,
  className = "",
  priority = false,
}: CommunityPhotoProps) {
  return (
    <img
      src={credit.file}
      alt={credit.alt}
      className={`community-photo ${className}`.trim()}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
