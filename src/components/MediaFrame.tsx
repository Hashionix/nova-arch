import { cn } from "@/lib/cn";

type MediaFrameProps = {
  src: string;
  alt: string;
  className?: string;
  aspect?: "16-9" | "4-3" | "3-4";
};

const aspectClassMap = {
  "16-9": "media-16-9",
  "4-3": "media-4-3",
  "3-4": "media-3-4",
};

export function MediaFrame({
  src,
  alt,
  className,
  aspect = "16-9",
}: MediaFrameProps) {
  return (
    <figure
      className={cn(
        "surface-panel overflow-hidden",
        aspectClassMap[aspect],
        className,
      )}
    >
      <img className="h-full w-full object-cover" src={src} alt={alt} />
    </figure>
  );
}
