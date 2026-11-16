import { extractYouTubeId } from "@/lib/youtube";

interface YouTubeCardProps {
  url: string;
}

export default function YouTubeCard({ url }: YouTubeCardProps) {
  const id = extractYouTubeId(url);

  if (!id) {
    return <span>{url}</span>;
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-stone-200 shadow-sm">
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube動画"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
