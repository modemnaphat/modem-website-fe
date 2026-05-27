import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import {
  isBotLikeUserAgent,
  isTrackablePath,
  normalizeReferrer,
  VISITOR_COOKIE,
} from "@/lib/analytics";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent");
    const body = await request.json().catch(() => ({}));
    const path = body?.path;

    if (isBotLikeUserAgent(userAgent) || !isTrackablePath(path)) {
      return NextResponse.json({ ok: true });
    }

    const visitorId =
      request.cookies.get(VISITOR_COOKIE)?.value || crypto.randomUUID();

    await prisma.websiteVisitor.upsert({
      where: { id: visitorId },
      create: { id: visitorId },
      update: { lastSeenAt: new Date() },
    });

    await prisma.websitePageView.create({
      data: {
        visitorId,
        path,
        referrer: normalizeReferrer(body?.referrer),
      },
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Analytics track API error:", error);
    return NextResponse.json({ ok: true });
  }
}
