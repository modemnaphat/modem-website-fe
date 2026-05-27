import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Footer, Navtop } from "@/app/components/shared";
import {
  isManagementAuthConfigured,
  MANAGEMENT_SESSION_COOKIE,
  verifyManagementSessionToken,
} from "@/lib/managementAuth";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Management",
  description: "Management visitor analytics dashboard.",
};

export const dynamic = "force-dynamic";

function ConfigError() {
  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-6">
      <p className="font-bold text-red-300">Dashboard auth is not configured.</p>
      <p className="mt-2 text-sm text-white/60">
        Set MANAGEMENT_DASHBOARD_PASSWORD and
        MANAGEMENT_DASHBOARD_SESSION_SECRET before opening analytics data.
      </p>
    </div>
  );
}

export default async function ManagementPage() {
  const isConfigured = isManagementAuthConfigured();

  if (isConfigured) {
    const cookieStore = await cookies();
    const session = cookieStore.get(MANAGEMENT_SESSION_COOKIE)?.value;

    if (!verifyManagementSessionToken(session)) {
      redirect("/management/login");
    }
  }

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] max-w-[100vw]">
      <div className="sticky top-0 h-[60px] z-950">
        <Navtop />
      </div>

      <main className="mx-auto mb-20 w-full max-w-6xl overflow-hidden px-4 py-12">
        {isConfigured ? <DashboardClient /> : <ConfigError />}
      </main>

      <div className="w-full h-fit mt-8 mb-4">
        <Footer />
      </div>
    </div>
  );
}
