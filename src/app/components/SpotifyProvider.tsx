"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

// King Sol & The Vibes — Artist URI and tracks
const ARTIST_ID = "4iYxgancLoKojQUwbWkIGT";
const ARTIST_URI = `spotify:artist:${ARTIST_ID}`;

export interface SpotifyTrack {
  uri: string;
  name: string;
  artist: string;
  albumArt: string;
  duration: number;
}

interface SpotifyState {
  isAuthenticated: boolean;
  isPremium: boolean;
  userName: string | null;
  isSDKReady: boolean;
  deviceId: string | null;
  currentTrack: SpotifyTrack | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  queue: SpotifyTrack[];
  // Actions
  login: () => void;
  logout: () => void;
  play: (uri?: string) => Promise<void>;
  pause: () => Promise<void>;
  togglePlay: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  seek: (ms: number) => Promise<void>;
  playArtist: () => Promise<void>;
}

const SpotifyContext = createContext<SpotifyState | null>(null);

export function useSpotify() {
  const ctx = useContext(SpotifyContext);
  if (!ctx) throw new Error("useSpotify must be used within SpotifyProvider");
  return ctx;
}

// Extend Window for Spotify SDK
declare global {
  interface Window {
    Spotify: typeof Spotify;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

export default function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSDKReady, setIsSDKReady] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<SpotifyTrack[]>([]);

  const playerRef = useRef<Spotify.Player | null>(null);
  const tokenRef = useRef<string | null>(null);
  const positionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch access token from our API
  const getToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch("/api/spotify/token");
      if (!res.ok) return null;
      const data = await res.json();
      tokenRef.current = data.access_token;
      return data.access_token;
    } catch {
      return null;
    }
  }, []);

  // Check auth status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/spotify/me");
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setUserName(data.name);
          setIsPremium(data.product === "premium");
        }
      } catch {
        // Not authenticated
      }
    }
    checkAuth();
  }, []);

  // Load Spotify Web Playback SDK when authenticated + premium
  useEffect(() => {
    if (!isAuthenticated || !isPremium) return;

    // Don't load SDK twice
    if (window.Spotify) {
      initPlayer();
      return;
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      initPlayer();
    };

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current = null;
      }
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isPremium]);

  async function initPlayer() {
    const token = await getToken();
    if (!token) return;

    const player = new window.Spotify.Player({
      name: "King Sol & The Vibes",
      getOAuthToken: async (cb) => {
        const t = await getToken();
        if (t) cb(t);
      },
      volume: 0.8,
    });

    player.addListener("ready", ({ device_id }) => {
      setDeviceId(device_id);
      setIsSDKReady(true);
    });

    player.addListener("not_ready", () => {
      setDeviceId(null);
      setIsSDKReady(false);
    });

    player.addListener("player_state_changed", (state) => {
      if (!state) return;

      const track = state.track_window.current_track;
      if (track) {
        setCurrentTrack({
          uri: track.uri,
          name: track.name,
          artist: track.artists.map((a) => a.name).join(", "),
          albumArt: track.album.images[0]?.url || "",
          duration: track.duration_ms,
        });
        setDuration(track.duration_ms);
      }

      setIsPlaying(!state.paused);
      setPosition(state.position);

      // Build queue from next tracks
      const nextTracks = state.track_window.next_tracks.map((t) => ({
        uri: t.uri,
        name: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        albumArt: t.album.images[0]?.url || "",
        duration: t.duration_ms,
      }));
      setQueue(nextTracks);
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error("Spotify init error:", message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error("Spotify auth error:", message);
      setIsAuthenticated(false);
    });

    player.addListener("account_error", ({ message }) => {
      console.error("Spotify account error:", message);
    });

    await player.connect();
    playerRef.current = player;
  }

  // Track position updates
  useEffect(() => {
    if (positionIntervalRef.current) {
      clearInterval(positionIntervalRef.current);
      positionIntervalRef.current = null;
    }

    if (isPlaying) {
      positionIntervalRef.current = setInterval(() => {
        setPosition((p) => p + 500);
      }, 500);
    }

    return () => {
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
    };
  }, [isPlaying]);

  // --- Actions ---

  const login = useCallback(() => {
    window.location.href = "/api/spotify/auth";
  }, []);

  const logout = useCallback(async () => {
    if (playerRef.current) {
      playerRef.current.disconnect();
      playerRef.current = null;
    }
    await fetch("/api/spotify/logout", { method: "POST" });
    setIsAuthenticated(false);
    setIsPremium(false);
    setUserName(null);
    setIsSDKReady(false);
    setDeviceId(null);
    setCurrentTrack(null);
    setIsPlaying(false);
  }, []);

  const apiCall = useCallback(async (endpoint: string, method = "PUT", body?: object) => {
    const token = await getToken();
    if (!token || !deviceId) return;

    await fetch(`https://api.spotify.com/v1/me/player${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }, [getToken, deviceId]);

  const play = useCallback(async (uri?: string) => {
    const token = await getToken();
    if (!token || !deviceId) return;

    const body: Record<string, unknown> = {};
    if (uri) {
      if (uri.startsWith("spotify:track:")) {
        body.uris = [uri];
      } else {
        body.context_uri = uri;
      }
    }

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
    });
  }, [getToken, deviceId]);

  const pause = useCallback(async () => {
    await apiCall("/pause");
  }, [apiCall]);

  const togglePlay = useCallback(async () => {
    if (!playerRef.current) return;
    await playerRef.current.togglePlay();
  }, []);

  const next = useCallback(async () => {
    if (!playerRef.current) return;
    await playerRef.current.nextTrack();
  }, []);

  const previous = useCallback(async () => {
    if (!playerRef.current) return;
    await playerRef.current.previousTrack();
  }, []);

  const seek = useCallback(async (ms: number) => {
    if (!playerRef.current) return;
    await playerRef.current.seek(ms);
    setPosition(ms);
  }, []);

  const playArtist = useCallback(async () => {
    await play(ARTIST_URI);
  }, [play]);

  return (
    <SpotifyContext.Provider
      value={{
        isAuthenticated,
        isPremium,
        userName,
        isSDKReady,
        deviceId,
        currentTrack,
        isPlaying,
        position,
        duration,
        queue,
        login,
        logout,
        play,
        pause,
        togglePlay,
        next,
        previous,
        seek,
        playArtist,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}
