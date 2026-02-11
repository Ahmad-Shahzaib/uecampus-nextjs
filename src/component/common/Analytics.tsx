"use client";
import React, { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

function insertScript(src: string, id?: string, inline?: string) {
  if (id && document.getElementById(id)) return;
  const s = document.createElement("script");
  if (id) s.id = id;
  if (inline) {
    s.type = "text/javascript";
    s.appendChild(document.createTextNode(inline));
  } else {
    s.src = src;
    s.async = true;
  }
  document.head.appendChild(s);
}

function insertGtmNoScript(gtmId: string) {
 
  if (document.getElementById("gtm-noscript")) return;
  const div = document.createElement("div");
  div.id = "gtm-noscript";
  div.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.insertBefore(div, document.body.firstChild);
}

export default function Analytics() {
  const [consent, setConsent] = useState<boolean>(() => {
    try {
      return localStorage.getItem("ue_cookie_consent") === "analytics";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (!consent) return;

     
    if (GTM_ID) {
    
      insertScript(
        "",
        "gtm-init",
        `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());`
      );
      insertScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`, "gtm-script");
      insertGtmNoScript(GTM_ID);
    }

    
    if (GA_ID) {
      insertScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, "ga-script");
      insertScript(
        "gtag-inline",
        "gtag-inline",
        `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { send_page_view: true });`
      );
    }
  }, [consent]);

  const accept = () => {
    try {
      localStorage.setItem("ue_cookie_consent", "analytics");
    } catch (e) {}
    setConsent(true);
  };

  const decline = () => {
    try {
      localStorage.setItem("ue_cookie_consent", "denied");
    } catch (e) {}
    setConsent(false);
  };

  if (consent) return null;

 
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 z-50">
      <div className="max-w-3xl mx-auto bg-white/95 border p-4 rounded-lg shadow flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 text-sm text-foreground">
          We use cookies to improve your experience and analyze traffic. By accepting,
          you allow analytics scripts (Google Analytics / Tag Manager) to run.
        </div>
        <div className="flex gap-2">
          <button onClick={decline} className="px-3 py-2 border rounded-md">Decline</button>
          <button onClick={accept} className="px-3 py-2 bg-purple-600 text-white rounded-md">Accept</button>
        </div>
      </div>
    </div>
  );
}
