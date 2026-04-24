"use client";

import { useSyncExternalStore } from "react";
import { Analytics } from "@vercel/analytics/next";
import Clarity from "./Clarity";

/**
 * Wrapper unificat pentru toate tool-urile de analytics.
 *
 * Nu se incarca daca:
 * - Nu suntem in production (evita poluarea datelor din dev)
 * - Userul si-a setat opt-out local: `localStorage.setItem('no-analytics', '1')`
 *
 * Pentru a reactiva: `localStorage.removeItem('no-analytics')`
 */

const OPT_OUT_KEY = "no-analytics";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem(OPT_OUT_KEY) === "1";
}

function getServerSnapshot() {
  return false;
}

export default function AnalyticsProvider() {
  const optedOut = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (process.env.NODE_ENV !== "production") return null;
  if (optedOut) return null;

  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      <Analytics />
      {clarityId && <Clarity projectId={clarityId} />}
    </>
  );
}
