"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    // Enable GA after consent
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
    });
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
    // Keep GA disabled
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
    });
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-sm text-slate-300 flex-1">
          🍪 We use cookies to analyse traffic and improve your experience.{" "}
          <a
            href="/privacy"
            className="text-indigo-400 hover:underline"
          >
            Privacy policy
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-xl border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 text-sm transition"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
