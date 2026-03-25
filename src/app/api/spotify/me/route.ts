import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await res.json();
  return NextResponse.json({
    authenticated: true,
    name: user.display_name,
    product: user.product, // "premium" or "free"
  });
}
