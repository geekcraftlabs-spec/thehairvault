// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Crown, Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        setSubmitting(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[#ec4899]/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Crown className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
          <p className="text-xs tracking-[0.4em] uppercase text-[#ec4899] mb-2">
            Admin Access
          </p>
          <h1 className="text-3xl font-bold tracking-tighter">
            <span className="text-[#d4af37]">THE</span>{" "}
            <span className="text-[#ec4899]">HAIR</span>{" "}
            <span className="text-[#d4af37]">VAULT</span>
          </h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-5 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-sm font-semibold tracking-widest uppercase text-[#d4af37]">
              Enter Password
            </h2>
          </div>

          <input
            type="password"
            autoComplete="current-password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || password.length === 0}
            className="w-full py-3 bg-[#d4af37] text-black font-bold tracking-widest rounded-xl hover:bg-[#ec4899] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> VERIFYING...
              </>
            ) : (
              "UNLOCK DASHBOARD"
            )}
          </button>
        </form>

        <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase text-center mt-8">
          Premium Hair · Timeless Beauty · Unapologetic You
        </p>
      </motion.div>
    </main>
  );
}