export function LeadPhotos({ photos }: { photos: string[] | null }) {
  if (!photos || photos.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {photos.slice(0, 6).map((url, i) => (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Photo ${i + 1}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={`Photo ${i + 1}`}
            className="h-11 w-11 rounded-md border border-slate-200 object-cover"
          />
        </a>
      ))}
    </div>
  );
}
