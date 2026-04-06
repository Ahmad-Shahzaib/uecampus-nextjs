// app/privacy-policy/page.tsx  (App Router)
// pages/privacy-policy.tsx     (Pages Router)
// Requires: Tailwind CSS v3+ configured in your project

import React from "react";

const sections = [
  {
    num: "1",
    title: "Information We Collect",
    content: (
      <>
        <p className="text-[#374151] mb-3">
          We may collect the following types of information when you register for or use UECampus:
        </p>
        <ul className="mt-2 divide-y divide-[#E2D9F3]">
          {[
            { label: "Account Information", desc: "Name, email address, profile photo, and university affiliation provided during registration (including via Facebook/Meta login)." },
            { label: "Profile Data", desc: "Academic details, interests, and any content you voluntarily share on your profile." },
            { label: "Usage Data", desc: "Pages visited, features used, interactions, session duration, and device/browser information." },
            { label: "Communications", desc: "Messages, posts, or other content you submit through our platform." },
            { label: "Location Data", desc: "General location (country/city) derived from your IP address, if applicable." },
            { label: "Third-Party Login Data", desc: "When you log in via Facebook, we receive data permitted by your Facebook privacy settings (e.g., name, email, profile picture)." },
          ].map((item) => (
            <li key={item.label} className="relative pl-7 py-2 text-[#374151] last:border-b-0">
              <span className="absolute left-0 text-[#A855F7] font-bold">→</span>
              <strong className="font-semibold">{item.label}:</strong> {item.desc}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "2",
    title: "How We Use Your Information",
    content: (
      <>
        <p className="text-[#374151] mb-3">We use collected information to:</p>
        <ul className="mt-2 divide-y divide-[#E2D9F3]">
          {[
            "Create and manage your UECampus account.",
            "Provide, operate, and improve our platform features.",
            "Personalize your campus experience and content recommendations.",
            "Communicate with you about updates, services, and support.",
            "Ensure platform safety, prevent fraud, and enforce our Terms of Service.",
            "Comply with legal obligations and respond to lawful requests.",
            "Analyze usage trends to improve our services.",
          ].map((item) => (
            <li key={item} className="relative pl-7 py-2 text-[#374151] last:border-b-0">
              <span className="absolute left-0 text-[#A855F7] font-bold">→</span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "3",
    title: "Sharing of Information",
    content: (
      <>
        <p className="text-[#374151] mb-3">
          We do <strong className="font-semibold">not</strong> sell your personal information. We may share data with:
        </p>
        <ul className="mt-2 divide-y divide-[#E2D9F3]">
          {[
            { label: "Service Providers", desc: "Trusted third parties that assist us in operating the platform (hosting, analytics, email delivery), bound by confidentiality obligations." },
            { label: "Meta / Facebook", desc: "Data interactions required by the Facebook Login API.", link: { href: "https://www.facebook.com/privacy/policy/", text: "Meta's Privacy Policy" } },
            { label: "Legal Requirements", desc: "Authorities or parties when required by law, court order, or to protect our rights." },
            { label: "Business Transfers", desc: "In the event of a merger, acquisition, or sale of assets, your information may be transferred with prior notice." },
          ].map((item) => (
            <li key={item.label} className="relative pl-7 py-2 text-[#374151] last:border-b-0">
              <span className="absolute left-0 text-[#A855F7] font-bold">→</span>
              <strong className="font-semibold">{item.label}:</strong> {item.desc}{" "}
              {"link" in item && item.link && (
                <a href={item.link.href} className="text-[#4A1D96] font-semibold no-underline hover:text-[#A855F7]">
                  {item.link.text}
                </a>
              )}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "4",
    title: "Cookies & Tracking Technologies",
    content: (
      <p className="text-[#374151]">
        UECampus uses cookies and similar technologies to maintain sessions, remember your preferences, and understand
        how our platform is used. You may control cookie settings through your browser; however, disabling cookies may
        affect certain features.
      </p>
    ),
  },
  {
    num: "5",
    title: "Data Retention",
    content: (
      <p className="text-[#374151]">
        We retain your personal data for as long as your account is active or as necessary to provide our services.
        Upon deletion of your account (see our{" "}
        <a href="/data-deletion" className="text-[#4A1D96] font-semibold no-underline hover:text-[#A855F7]">
          Data Deletion page
        </a>
        ), we will remove your personal data within <strong className="font-semibold">30 days</strong>, except where
        retention is required by law.
      </p>
    ),
  },
  {
    num: "6",
    title: "Your Rights",
    content: (
      <>
        <p className="text-[#374151] mb-3">Depending on your location, you may have the right to:</p>
        <ul className="mt-2 divide-y divide-[#E2D9F3]">
          {[
            "Access a copy of the personal data we hold about you.",
            "Correct inaccurate or incomplete information.",
            "Request deletion of your personal data.",
            "Object to or restrict certain types of processing.",
            "Withdraw consent at any time where processing is based on consent.",
            "Lodge a complaint with a supervisory authority.",
          ].map((item) => (
            <li key={item} className="relative pl-7 py-2 text-[#374151] last:border-b-0">
              <span className="absolute left-0 text-[#A855F7] font-bold">→</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="bg-[#EDE9FA] border-l-4 border-[#4A1D96] rounded-r-xl px-5 py-4 mt-4">
          <p className="text-[#4A1D96] font-medium m-0">
            To exercise any of these rights, please contact us at the details below or visit our{" "}
            <a href="/data-deletion" className="text-[#4A1D96] no-underline font-semibold hover:text-[#A855F7]">
              Data Deletion page
            </a>.
          </p>
        </div>
      </>
    ),
  },
  {
    num: "7",
    title: "Security",
    content: (
      <p className="text-[#374151]">
        We implement appropriate technical and organizational measures to protect your personal information from
        unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
        internet is 100% secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    num: "8",
    title: "Children's Privacy",
    content: (
      <p className="text-[#374151]">
        UECampus is intended for university students and is not directed at children under the age of 13. We do not
        knowingly collect personal information from children. If you believe a child has provided us with personal
        data, please contact us immediately.
      </p>
    ),
  },
  {
    num: "9",
    title: "Changes to This Policy",
    content: (
      <p className="text-[#374151]">
        We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new
        policy on this page with an updated date. Your continued use of UECampus after any changes constitutes
        acceptance of the updated policy.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F3FA] text-[#1C1C1E] text-base leading-7">

      {/* Header */}
      <header className="bg-[#4A1D96] text-white py-12 text-center relative overflow-hidden">
        <span className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-yellow-400/15 pointer-events-none" />
        <span className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6">
          <span className="inline-block bg-[#A855F7] text-white text-xs font-semibold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5">
            uecampus.com
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-white/70 font-light">
            Last updated: April 4, 2026 &nbsp;·&nbsp; Effective immediately
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="py-16 pb-20">
        <div className="max-w-3xl mx-auto px-6">

          {/* Intro card */}
          <div className="bg-[#4A1D96] text-white rounded-2xl p-8 mb-12 flex gap-4 items-start">
            <span className="text-3xl shrink-0 mt-0.5">🔒</span>
            <p className="text-sm leading-relaxed text-white/90 m-0">
              At <strong className="text-white font-semibold">UECampus</strong>, your privacy matters deeply to us.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use
              our platform. By using UECampus, you agree to the practices described in this policy.
            </p>
          </div>

          {/* Sections 1–9 */}
          {sections.map((s) => (
            <section key={s.num} className="mb-11">
              <div className="flex items-center gap-3 mb-4 pb-3.5 border-b-2 border-[#E2D9F3]">
                <div className="w-9 h-9 bg-[#A855F7] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                  {s.num}
                </div>
                <h2 className="text-2xl font-normal text-[#4A1D96]">{s.title}</h2>
              </div>
              {s.content}
            </section>
          ))}

          {/* Section 10 – Contact */}
          <section className="mb-11">
            <div className="flex items-center gap-3 mb-4 pb-3.5 border-b-2 border-[#E2D9F3]">
              <div className="w-9 h-9 bg-[#A855F7] text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                10
              </div>
              <h2 className="text-2xl font-normal text-[#4A1D96]">Contact Us</h2>
            </div>
            <div className="bg-white border border-[#E2D9F3] rounded-2xl p-8">
              <p className="text-[#374151] mb-2.5">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:
              </p>
              <p className="text-[#374151] mb-2.5">
                🌐 Website:{" "}
                <a href="https://uecampus.com" className="text-[#4A1D96] font-semibold no-underline border-b border-[#A855F7] pb-px hover:text-[#A855F7] transition-colors">
                  uecampus.com
                </a>
              </p>
              <p className="text-[#374151]">
                📧 Email:{" "}
                <a href="mailto:privacy@uecampus.com" className="text-[#4A1D96] font-semibold no-underline border-b border-[#A855F7] pb-px hover:text-[#A855F7] transition-colors">
                  privacy@uecampus.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      

    </div>
  );
}