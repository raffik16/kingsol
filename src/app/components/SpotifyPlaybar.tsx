"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  spotifyUri: string;
}

const TRACKS: Track[] = [
  { id: "1", title: "Three Worlds", artist: "King Sol & The Vibes", spotifyUri: "album/5KRIMITzqnOvaEsMQnKBpj" },
  { id: "2", title: "Mass Shooting", artist: "King Sol & The Vibes", spotifyUri: "track/0MxYNEPrQmMQKmEJZmhKma" },
  { id: "3", title: "Broken History", artist: "King Sol & The Vibes", spotifyUri: "track/6B4FxPn1Q4VfN0FxK2Xpml" },
  { id: "4", title: "Corona Panic", artist: "King Sol & The Vibes", spotifyUri: "track/3VTJi6kQhleOA2XkP0Gxjd" },
  { id: "5", title: "Ooh Baby", artist: "King Sol & The Vibes", spotifyUri: "track/5GjyK9gDMAKpOxJnuOVfMp" },
  { id: "6", title: "We Will Rise", artist: "King Sol & The Vibes", spotifyUri: "track/1RnhS2FD3PKcPm0iOXkZ16" },
  { id: "7", title: "Political Brother", artist: "King Sol & The Vibes", spotifyUri: "track/6qLB5nqEJxgQrRxAG9sTOw" },
  { id: "8", title: "Reggae Blues", artist: "King Sol & The Vibes", spotifyUri: "track/4x0LAzBowZo3nY3JePrvNg" },
];

export default function SpotifyPlaybar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const track = TRACKS[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? TRACKS.length - 1 : i - 1));
    setIsPlaying(true);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => (i === TRACKS.length - 1 ? 0 : i + 1));
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
    if (!isOpen) setIsOpen(true);
  }, [isOpen]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((e) => !e);
  }, []);

  // Open the bar when a track starts
  useEffect(() => {
    if (isPlaying && !isOpen) setIsOpen(true);
  }, [isPlaying, isOpen]);

  const spotifyEmbedUrl = `https://open.spotify.com/embed/${track.spotifyUri}?utm_source=generator&theme=0`;

  return (
    <>
      {/* Floating Music Button (when bar is closed) */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); }}
          className="playbar-fab"
          aria-label="Open music player"
        >
          <div className="playbar-fab-record">
            <div className="playbar-fab-grooves" />
            <div className="playbar-fab-label" />
          </div>
        </button>
      )}

      {/* Playbar */}
      <div className={`playbar ${isOpen ? "playbar-open" : ""} ${isExpanded ? "playbar-expanded" : ""}`}>
        {/* Collapse / expand handle */}
        <button
          onClick={isExpanded ? toggleExpanded : () => setIsOpen(false)}
          className="playbar-handle"
          aria-label={isExpanded ? "Collapse player" : "Close player"}
        >
          <svg width="32" height="4" viewBox="0 0 32 4" className="opacity-40">
            <rect width="32" height="4" rx="2" fill="currentColor" />
          </svg>
        </button>

        {/* Main bar content */}
        <div className="playbar-main">
          {/* Spinning Record */}
          <div className="playbar-record-wrapper" onClick={toggleExpanded}>
            <div className={`playbar-record ${isPlaying ? "playbar-spinning" : ""}`}>
              {/* Vinyl grooves */}
              <div className="playbar-groove playbar-groove-1" />
              <div className="playbar-groove playbar-groove-2" />
              <div className="playbar-groove playbar-groove-3" />
              {/* Center label */}
              <div className="playbar-label">
                <div className="playbar-label-inner">
                  <span className="playbar-label-text">KS</span>
                </div>
              </div>
              {/* Shine effect */}
              <div className="playbar-shine" />
            </div>
          </div>

          {/* Track info */}
          <div className="playbar-info">
            <div className="playbar-title">{track.title}</div>
            <div className="playbar-artist">{track.artist}</div>
          </div>

          {/* Controls */}
          <div className="playbar-controls">
            <button onClick={handlePrev} className="playbar-btn" aria-label="Previous track">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button onClick={togglePlay} className="playbar-btn playbar-btn-play" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button onClick={handleNext} className="playbar-btn" aria-label="Next track">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Track counter */}
          <div className="playbar-counter">
            {currentIndex + 1}/{TRACKS.length}
          </div>
        </div>

        {/* Expanded view: Spotify embed + track list */}
        {isExpanded && (
          <div className="playbar-expanded-content">
            {/* Spotify embed for actual playback */}
            <div className="playbar-embed">
              <iframe
                ref={iframeRef}
                src={spotifyEmbedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: "12px" }}
              />
            </div>

            {/* Track list */}
            <div className="playbar-tracklist">
              {TRACKS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => { setCurrentIndex(i); setIsPlaying(true); }}
                  className={`playbar-track-item ${i === currentIndex ? "playbar-track-active" : ""}`}
                >
                  <div className={`playbar-track-num ${i === currentIndex ? "text-sol-gold" : "text-[#555]"}`}>
                    {i === currentIndex && isPlaying ? (
                      <span className="playbar-eq">
                        <span /><span /><span />
                      </span>
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </div>
                  <div className="playbar-track-title">{t.title}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rasta accent line at bottom of bar */}
        <div className="playbar-rasta" />
      </div>
    </>
  );
}
