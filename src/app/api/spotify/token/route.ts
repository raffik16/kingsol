import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value;
  const refreshToken = request.cookies.get("spotify_refresh_token")?.value;

  // If we have a valid access token, return it
  if (accessToken) {
    return NextResponse.json({ access_token: accessToken });
  }

  // If no access token but we have a refresh token, refresh it
  if (refreshToken) {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!tokenRes.ok) {
      // Refresh failed — clear cookies and tell client to re-auth
      const response = NextResponse.json({ access_token: null }, { status: 401 });
      response.cookies.delete("spotify_access_token");
      response.cookies.delete("spotify_refresh_token");
      return response;
    }

    const tokens = await tokenRes.json();

    const response = NextResponse.json({ access_token: tokens.access_token });

    response.cookies.set("spotify_access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokens.expires_in,
      path: "/",
    });

    // Spotify sometimes returns a new refresh token
    if (tokens.refresh_token) {
      response.cookies.set("spotify_refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }

    return response;
  }

  // No tokens at all
  return NextResponse.json({ access_token: null }, { status: 401 });
}
