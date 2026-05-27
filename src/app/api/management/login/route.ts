import { NextRequest, NextResponse } from "next/server";

import {
  createManagementSessionToken,
  isManagementAuthConfigured,
  MANAGEMENT_SESSION_COOKIE,
  MANAGEMENT_SESSION_MAX_AGE_SECONDS,
  verifyManagementPassword,
} from "@/lib/managementAuth";

export async function POST(request: NextRequest) {
  if (!isManagementAuthConfigured()) {
    return NextResponse.json(
      { error: "Management dashboard auth is not configured" },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));

  if (!verifyManagementPassword(body?.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(MANAGEMENT_SESSION_COOKIE, createManagementSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MANAGEMENT_SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  return response;
}
