import { NextRequest, NextResponse } from "next/server"

const PROVIDERS = new Set(["google", "azure"])

// Kicks off centralized OAuth: redirect to Thunder Core, which runs the provider handshake
// and returns a launch token to our own /auth/launch. CityZen runs no Supabase auth client.
export function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get("provider")
  if (!provider || !PROVIDERS.has(provider)) {
    return NextResponse.redirect(new URL("/login?error=invalid_provider", request.url))
  }
  const thunder = process.env.THUNDER_CORE_API_URL?.replace(/\/$/, "")
  if (!thunder) {
    return NextResponse.redirect(new URL("/login?error=oauth_unavailable", request.url))
  }
  const start = new URL(`${thunder}/auth/oauth/start`)
  start.searchParams.set("provider", provider)
  start.searchParams.set("return_to", request.nextUrl.origin)
  return NextResponse.redirect(start.toString())
}
