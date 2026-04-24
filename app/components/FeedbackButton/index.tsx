"use client";

import { MessageCircle } from "lucide-react";
import Script from "next/script";
import { TALLY_FEEDBACK_FORM_ID } from "../../lib/config";

export function FeedbackButton() {
  return (
    <>
      <Script
        id="tally-embed-script"
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />

      <button
        type="button"
        data-tally-open={TALLY_FEEDBACK_FORM_ID}
        data-tally-emoji-text="👋"
        data-tally-emoji-animation="wave"
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-gray-500 transition-colors hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-gray-400 dark:hover:text-gray-200"
        aria-label="Trimite feedback"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        <span>Feedback</span>
      </button>
    </>
  );
}
