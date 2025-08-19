"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus({ type: "loading" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to join waitlist");
      }
      setStatus({ type: "success", message: "You're on the list!" });
      setEmail("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setStatus({ type: "error", message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex items-stretch gap-2 rounded-2xl bg-white/5 ring-1 ring-white/10 p-1 backdrop-blur-sm">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to join the waitlist"
          className="flex-1 bg-transparent text-white placeholder:text-white/60 px-4 py-3 outline-none"
        />
        <button
          disabled={status.type === "loading"}
          className="shrink-0 rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-white/90 disabled:opacity-60"
          type="submit"
        >
          {status.type === "loading" ? "Submitting…" : "Notify me"}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-sm text-white/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent"
        />
        <span>
          I agree to receive email updates. You can unsubscribe anytime.
        </span>
      </label>

      {status.type === "success" && (
        <p className="mt-3 text-emerald-400 text-sm">{status.message}</p>
      )}
      {status.type === "error" && (
        <p className="mt-3 text-rose-400 text-sm">{status.message}</p>
      )}
    </form>
  );
}


