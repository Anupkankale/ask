import { useState } from "react";

/**
 * A YouTube thumbnail that turns into the real player on click.
 *
 * Each embedded player pulls in ~1 MB of YouTube JavaScript plus its own
 * fonts, even with loading="lazy" (Chrome starts lazy iframes well before they
 * scroll into view). Three of them cost the homepage ~1.3 s of blocking time on
 * desktop, so nothing from YouTube loads until a visitor asks for it.
 */
export function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block h-full w-full cursor-pointer overflow-hidden bg-primary"
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-primary/10 transition group-hover:bg-primary/0">
        <span className="flex h-14 w-20 items-center justify-center rounded-2xl bg-accent shadow-lg transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-7 w-7 fill-white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
