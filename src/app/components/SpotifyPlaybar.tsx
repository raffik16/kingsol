"use client";

import { useState, useCallback } from "react";
import { useSpotify } from "./SpotifyProvider";

// Fallback embed URI for non-authenticated / non-premium users
const ARTIST_EMBED = "https://open.spotify.com/embed/artist/4iYxgancLoKojQUwbWkIGT?utm_source=generator&theme=0";
const ARTIST_URI = "spotify:artist:4iYxgancLoKojQUwbWkIGT";

function formatTime(ms: number) {
  const s = Math.floor(ms / 1000);
  const min = Math.floor(s / 60);
  const sec = s % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function SpotifyPlaybar() {
  const spotify = useSpotify();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { currentTrack, isPlaying, isAuthenticated, isSDKReady, position, duration, queue } = spotify;

  const toggleExpanded = useCallback(() => setIsExpanded((e) => !e), []);

  const handlePlay = useCallback(async () => {
    if (!isAuthenticated) {
      spotify.login();
      return;
    }
    if (!isSDKReady) return;

    if (currentTrack) {
      await spotify.togglePlay();
    } else {
      // First play — start the artist's music
      await spotify.playArtist();
    }
    if (!isOpen) setIsOpen(true);
  }, [isAuthenticated, isSDKReady, currentTrack, isOpen, spotify]);

  const handleNext = useCallback(async () => {
    if (isSDKReady) await spotify.next();
  }, [isSDKReady, spotify]);

  const handlePrev = useCallback(async () => {
    if (isSDKReady) await spotify.previous();
  }, [isSDKReady, spotify]);

  const handleSeek = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (!duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      await spotify.seek(Math.round(pct * duration));
    },
    [duration, spotify]
  );

  const handleTrackClick = useCallback(
    async (uri: string) => {
      if (isSDKReady) {
        await spotify.play(uri);
      }
    },
    [isSDKReady, spotify]
  );

  const progressPct = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

  // Display info — either from SDK or defaults
  const trackName = currentTrack?.name || "King Sol & The Vibes";
  const artistName = currentTrack?.artist || "Tap play to start listening";
  const albumArt = currentTrack?.albumArt;

  return (
    <>
      {/* Floating Music Button (when bar is closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="playbar-fab"
          aria-label="Open music player"
        >
          <div className={`playbar-fab-record ${isPlaying ? "" : "playbar-fab-paused"}`}>
            <div className="playbar-fab-grooves" />
            <div className="playbar-fab-label" />
          </div>
        </button>
      )}

      {/* Playbar */}
      <div className={`playbar ${isOpen ? "playbar-open" : ""} ${isExpanded ? "playbar-expanded" : ""}`}>
        {/* Handle */}
        <button
          onClick={isExpanded ? toggleExpanded : () => setIsOpen(false)}
          className="playbar-handle"
          aria-label={isExpanded ? "Collapse player" : "Close player"}
        >
          <svg width="32" height="4" viewBox="0 0 32 4" className="opacity-40">
            <rect width="32" height="4" rx="2" fill="currentColor" />
          </svg>
        </button>

        {/* Progress bar (thin line above controls) */}
        {isSDKReady && duration > 0 && (
          <div className="playbar-progress" onClick={handleSeek}>
            <div className="playbar-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        )}

        {/* Main bar content */}
        <div className="playbar-main">
          {/* Spinning Record / Album Art */}
          <div className="playbar-record-wrapper" onClick={toggleExpanded}>
            <div className={`playbar-record ${isPlaying ? "playbar-spinning" : ""}`}>
              {albumArt ? (
                <img src={albumArt} alt="" className="playbar-record-art" />
              ) : (
                <>
                  <div className="playbar-groove playbar-groove-1" />
                  <div className="playbar-groove playbar-groove-2" />
                  <div className="playbar-groove playbar-groove-3" />
                </>
              )}
              {/* Center label */}
              <div className="playbar-label">
                <div className="playbar-label-inner">
                  <span className="playbar-label-text">KS</span>
                </div>
              </div>
              {/* Shine */}
              <div className="playbar-shine" />
            </div>
          </div>

          {/* Track info */}
          <div className="playbar-info">
            <div className="playbar-title">{trackName}</div>
            <div className="playbar-artist">
              {artistName}
              {isSDKReady && duration > 0 && (
                <span className="playbar-time"> — {formatTime(position)} / {formatTime(duration)}</span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="playbar-controls">
            {isAuthenticated && isSDKReady ? (
              <>
                <button onClick={handlePrev} className="playbar-btn" aria-label="Previous track">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>

                <button onClick={handlePlay} className="playbar-btn playbar-btn-play" aria-label={isPlaying ? "Pause" : "Play"}>
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
              </>
            ) : (
              <button onClick={handlePlay} className="playbar-btn playbar-btn-play" aria-label="Connect Spotify">
                {!isAuthenticated ? (
                  /* Spotify icon for connect */
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                ) : (
                  /* Loading spinner while SDK loads */
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                    <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Auth status indicator */}
          {isAuthenticated && (
            <div className="playbar-status">
              <div className={`playbar-status-dot ${isSDKReady ? "playbar-status-connected" : ""}`} />
            </div>
          )}
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="playbar-expanded-content">
            {isAuthenticated && isSDKReady ? (
              <>
                {/* Now playing large view */}
                {currentTrack && (
                  <div className="playbar-now-playing">
                    {currentTrack.albumArt && (
                      <img src={currentTrack.albumArt} alt={currentTrack.name} className="playbar-album-art" />
                    )}
                    <div>
                      <div className="playbar-np-title">{currentTrack.name}</div>
                      <div className="playbar-np-artist">{currentTrack.artist}</div>
                    </div>
                  </div>
                )}

                {/* Up next */}
                {queue.length > 0 && (
                  <div className="playbar-tracklist">
                    <div className="playbar-tracklist-header">Up Next</div>
                    {queue.map((t, i) => (
                      <button
                        key={`${t.uri}-${i}`}
                        onClick={() => handleTrackClick(t.uri)}
                        className={`playbar-track-item`}
                      >
                        <div className="playbar-track-num text-[#555]">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        {t.albumArt && <img src={t.albumArt} alt="" className="playbar-track-art" />}
                        <div>
                          <div className="playbar-track-title">{t.name}</div>
                          <div className="playbar-track-subtitle">{t.artist}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* User info + logout */}
                <div className="playbar-footer">
                  <span className="text-[#555] text-[0.75rem]">
                    Connected as {spotify.userName}
                  </span>
                  <button onClick={spotify.logout} className="playbar-logout">
                    Disconnect
                  </button>
                </div>
              </>
            ) : !isAuthenticated ? (
              /* Not logged in — show connect prompt + embed fallback */
              <div className="playbar-connect">
                <div className="playbar-connect-text">
                  <h3 className="font-display text-[1.1rem] mb-2">Connect Spotify</h3>
                  <p className="text-[#888] text-[0.85rem] mb-4">
                    Connect your Spotify Premium account for full playback controls, or listen below with the embedded player.
                  </p>
                  <button onClick={spotify.login} className="btn btn-primary text-[0.8rem] py-2.5 px-6">
                    Connect Spotify
                  </button>
                </div>
                <div className="playbar-embed">
                  <iframe
                    src={ARTIST_EMBED}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: "12px" }}
                  />
                </div>
              </div>
            ) : (
              /* Authenticated but SDK loading */
              <div className="playbar-connect">
                <p className="text-[#888] text-[0.85rem]">
                  Connecting to Spotify...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Rasta accent line at bottom */}
        <div className="playbar-rasta" />
      </div>
    </>
  );
}
