import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "http://localhost:3000/api/spotify/callback";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const storedState = request.cookies.get("spotify_auth_state")?.value;

  if (error) {
    return NextResponse.redirect(new URL("/?spotify_error=" + error, request.url));
  }

  if (!state || state !== storedState) {
    return NextResponse.redirect(new URL("/?spotify_error=state_mismatch", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/?spotify_error=no_code", request.url));
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL("/?spotify_error=token_exchange_failed", request.url));
  }

  const tokens = await tokenRes.json();

  // Store tokens in HTTP-only cookies
  const response = NextResponse.redirect(new URL("/?spotify_connected=true", request.url));

  response.cookies.set("spotify_access_token", tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: tokens.expires_in,
    path: "/",
  });

  response.cookies.set("spotify_refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  // Clear the state cookie
  response.cookies.delete("spotify_auth_state");

  return response;
}
