// src/app/api/spotify/callback/route.ts
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code!,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    }),
  })

  const data = await response.json()
  console.log("✅ Access Token:", data.access_token)
  console.log("✅ Refresh Token:", data.refresh_token)

  return new Response("✅ Check your terminal. Copy the refresh token and paste it into .env.local")
}
