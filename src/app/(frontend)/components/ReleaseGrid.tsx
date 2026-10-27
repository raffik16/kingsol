"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";

export type Release = {
  title: string;
  year: string;
  type: "album" | "single" | "ep";
  spotifyId: string;
};

const INITIAL_COUNT = 6;

// Every release is server-rendered with its title, type and year as real text so
// search engines can index the whole discography (Spotify's iframes don't count as
// page content). Releases past the first six stay hidden, with no player mounted,
// until "Load more" is clicked.
export default function ReleaseGrid({ releases }: { releases: Release[] }) {
  const [expanded, setExpanded] = useState(false);
  const firstRevealed = useRef<HTMLAnchorElement>(null);

  // The button disappears on click, so hand focus to the first revealed release.
  useEffect(() => {
    if (expanded) firstRevealed.current?.focus({ preventScroll: true });
  }, [expanded]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {releases.map((r, i) => {
          const isExtra = i >= INITIAL_COUNT;
          const shown = !isExtra || expanded;
          return (
            <FadeIn
              key={r.spotifyId}
              className={shown ? "" : "hidden"}
              delay={isExtra ? (i - INITIAL_COUNT) * 100 : 0}
            >
              <article className="bg-sol-card border border-sol-border rounded-xl p-3 transition-all duration-300 hover:border-sol-gold/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                {shown && (
                  <iframe
                    title={`${r.title} on Spotify`}
                    className="block"
                    style={{ borderRadius: "12px" }}
                    src={`https://open.spotify.com/embed/album/${r.spotifyId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                )}
                <div className="flex items-center justify-between gap-3 px-1 pt-3">
                  <h3 className="min-w-0 truncate font-semibold text-[0.95rem]">
                    <a
                      ref={i === INITIAL_COUNT ? firstRevealed : undefined}
                      href={`https://open.spotify.com/album/${r.spotifyId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sol-gold transition-colors"
                    >
                      {r.title}
                    </a>
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`release-type ${r.type} !mt-0`}>{r.type}</span>
                    <span className="text-[0.8rem] text-[#888]">{r.year}</span>
                  </div>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>

      {!expanded && releases.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-10">
          <button type="button" onClick={() => setExpanded(true)} className="btn btn-outline">
            Load more
          </button>
        </div>
      )}
    </>
  );
}
