"use client";

import { useEffect } from "react";

const SCRIPT_ID = "microsoft-clarity";

type Props = {
  projectId: string;
};

export default function Clarity({ projectId }: Props) {
  useEffect(() => {
    // Guard impotriva dublu-inject (Strict Mode, HMR etc.)
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");
    `;
    document.head.appendChild(script);
  }, [projectId]);

  return null;
}
