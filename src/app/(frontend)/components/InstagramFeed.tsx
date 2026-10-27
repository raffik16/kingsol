"use client";

import { useEffect } from "react";

const PLATFORM_URL = "https://elfsightcdn.com/platform.js";

// Elfsight Instagram Feed (layout and posts are managed in the Elfsight dashboard).
// The platform script is added after hydration so it never changes server-rendered
// markup, and only once so client-side navigation back here doesn't reload it.
export default function InstagramFeed() {
  useEffect(() => {
    if (document.querySelector(`script[src="${PLATFORM_URL}"]`)) return;
    const script = document.createElement("script");
    script.src = PLATFORM_URL;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div className="elfsight-app-87f2f701-143f-4270-9b63-98a24b72e793" data-elfsight-app-lazy="" />;
}
