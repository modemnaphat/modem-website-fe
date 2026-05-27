import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Footer, Navtop } from "@/app/components/shared";
import {
  isManagementAuthConfigured,
  MANAGEMENT_SESSION_COOKIE,
  verifyManagementSessionToken,
} from "@/lib/managementAuth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Management Login",
  description: "Management dashboard login.",
};

export const dynamic = "force-dynamic";

export default async function ManagementLoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(MANAGEMENT_SESSION_COOKIE)?.value;

  if (verifyManagementSessionToken(session)) {
    redirect("/management");
  }

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] max-w-[100vw]">
      <div className="sticky top-0 h-[60px] z-950">
        <Navtop />
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 py-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            Management
          </p>
          <h1 className="text-3xl font-bold text-white max-sm:text-2xl">
            Dashboard Login
          </h1>
          <p className="max-w-lg text-white/60">
            Sign in to view visitor and page view analytics for this website.
          </p>
        </div>

        <LoginForm isConfigured={isManagementAuthConfigured()} />
      </main>

      <div className="w-full h-fit mt-8 mb-4">
        <Footer />
      </div>
    </div>
  );
}
