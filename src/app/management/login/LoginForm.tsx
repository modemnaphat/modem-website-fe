"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  isConfigured: boolean;
};

const LoginForm: React.FC<Props> = ({ isConfigured }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/management/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setError(
        response.status === 503
          ? "Management dashboard auth is not configured."
          : "Invalid password."
      );
      return;
    }

    router.push("/management");
    router.refresh();
  };

  if (!isConfigured) {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-[#282828] bg-white/[0.03] p-6"
    >
      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold text-white/70">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-lg border border-[#282828] bg-[#111111] px-4 py-3 text-white transition-all duration-200 focus:border-red-500"
          placeholder="Enter dashboard password"
          autoFocus
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isLoading || !password}
        className="rounded-lg border border-red-500 bg-red-500 px-6 py-3 font-bold text-white transition-all duration-200 hover:bg-red-500/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
