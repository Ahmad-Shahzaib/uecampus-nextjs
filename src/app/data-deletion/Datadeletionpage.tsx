// app/data-deletion/page.tsx  (App Router)
// pages/data-deletion.tsx     (Pages Router)
// Requires: Tailwind CSS v3+ configured in your project

import React from "react";

const deletionRows = [
  { status: "deleted", label: "Account & Profile Information", sub: "Name, email, profile photo, university details, bio" },
  { status: "deleted", label: "Posts, Comments & Content", sub: "All content you created or shared on the platform" },
  { status: "deleted", label: "Messages & Communications", sub: "Private messages, notifications, and chat history" },
  { status: "deleted", label: "Social Connections", sub: "Friends, followers, groups, and connection data" },
  { status: "deleted", label: "Facebook / Meta Login Data", sub: "All tokens and linked Facebook account associations" },
  { status: "retained", label: "Legal & Compliance Records", sub: "Retained only as required by applicable law (typically up to 7 years)" },
  { status: "retained", label: "Anonymized Aggregated Data", sub: "Non-identifiable, aggregated analytics that cannot be linked to you" },
];

const timelineItems = [
  { time: "Immediately", desc: "Account deactivated; profile no longer visible to other users." },
  { time: "Within 24 hours", desc: "Confirmation email sent; content removed from public view." },
  { time: "Within 7 days", desc: "Data removed from active databases and production systems." },
  { time: "Within 30 days", desc: "Complete deletion from all backups and secondary systems. Final confirmation sent." },
];

const steps = [
  {
    num: "1",
    title: "Request Received",
    body: (<>We receive your deletion request and send a confirmation email to your registered address within <strong className="font-semibold text-gray-800">24 hours</strong>.</>),
  },
  {
    num: "2",
    title: "Identity Verification",
    body: "To protect your account, we may ask you to verify your identity before processing the deletion. This ensures no one else can delete your data.",
  },
  {
    num: "3",
    title: "Processing Begins",
    body: "Your account is deactivated immediately and data deletion begins. Your data becomes inaccessible to other users right away.",
  },
  {
    num: "4",
    title: "Deletion Complete",
    body: (<>All personal data is permanently deleted from our systems within <strong className="font-semibold text-gray-800">30 days</strong>. You will receive a final confirmation email once deletion is complete.</>),
  },
];

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-[#F5F3FA] text-[#1C1C1E] text-base leading-7">

      {/* Header */}
      <header className="bg-[#4A1D96] text-white py-12 text-center relative overflow-hidden">
        <span className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-purple-400/15 pointer-events-none" />
        <span className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6">
          <span className="inline-block bg-[#C0392B] text-white text-xs font-semibold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5">
            Data Deletion
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight mb-3">Delete Your Data</h1>
          <p className="text-sm text-white/70 font-light">
            uecampus.com &nbsp;·&nbsp; Your right to be forgotten, honored.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="py-16 pb-20">
        <div className="max-w-3xl mx-auto px-6">

          {/* Warning */}
          <div className="bg-[#FDF2F0] border border-[#E8A9A1] rounded-2xl p-7 mb-12 flex gap-4 items-start">
            <span className="text-3xl shrink-0 mt-0.5">⚠️</span>
            <p className="text-sm text-[#7B241C] leading-relaxed m-0">
              <strong className="text-[#C0392B]">This action is permanent.</strong> Once your data deletion request is
              processed, your account, profile, content, and associated personal data will be permanently removed from
              UECampus. This <strong className="text-[#C0392B]">cannot be undone</strong>. Please make sure you want to
              proceed before submitting a request.
            </p>
          </div>

          {/* How to Request */}
          <h2 className="text-2xl font-normal text-[#4A1D96] mb-5 pb-3 border-b-2 border-[#E2D9F3]">
            How to Request Data Deletion
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {[
              { icon: "🌐", title: "Via Your Account", desc: "Log in to UECampus, go to Settings → Privacy → Delete My Account to submit a deletion request directly.", href: "https://uecampus.com/settings", label: "Go to Settings" },
              { icon: "📧", title: "Via Email", desc: 'Send a deletion request email from your registered address with subject "Data Deletion Request".', href: "mailto:privacy@uecampus.com", label: "Send Email" },
            ].map((m) => (
              <div key={m.title} className="bg-white border border-[#E2D9F3] rounded-2xl p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="text-4xl mb-4">{m.icon}</div>
                <h3 className="text-lg font-normal text-[#4A1D96] mb-2.5">{m.title}</h3>
                <p className="text-sm text-[#6B7280] mb-4">{m.desc}</p>
                <a href={m.href} className="inline-block bg-[#4A1D96] hover:bg-[#A855F7] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 no-underline">
                  {m.label}
                </a>
              </div>
            ))}
          </div>

          {/* Steps */}
          <h2 className="text-2xl font-normal text-[#4A1D96] mb-5 pb-3 border-b-2 border-[#E2D9F3]">
            What Happens Next
          </h2>
          <div className="mb-12 divide-y divide-[#E2D9F3]">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-5 items-start py-7">
                <div className="w-11 h-11 rounded-full bg-[#4A1D96] text-white flex items-center justify-center text-lg shrink-0 mt-0.5">
                  {s.num}
                </div>
                <div>
                  <h3 className="text-lg font-normal text-[#4A1D96] mb-2">{s.title}</h3>
                  <p className="text-[#374151] m-0">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Data Table */}
          <h2 className="text-2xl font-normal text-[#4A1D96] mb-5 pb-3 border-b-2 border-[#E2D9F3]">
            What Gets Deleted vs. Retained
          </h2>
          <div className="bg-white border border-[#E2D9F3] rounded-2xl overflow-hidden mb-12">
            <div className="bg-[#4A1D96] text-white px-6 py-4 text-lg font-normal">Data Breakdown</div>
            {deletionRows.map((row, i) => (
              <div key={row.label} className={`flex items-center gap-4 px-6 py-4 ${i !== deletionRows.length - 1 ? "border-b border-[#E2D9F3]" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${row.status === "deleted" ? "bg-[#D5F5E3] text-[#1E8449]" : "bg-[#FDEBD0] text-[#B7770D]"}`}>
                  {row.status === "deleted" ? "✓" : "!"}
                </div>
                <div className="flex-1">
                  <strong className="block text-sm font-semibold text-[#1C1C1E]">{row.label}</strong>
                  <span className="text-xs text-[#6B7280]">{row.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="bg-white border border-[#E2D9F3] rounded-2xl p-8 mb-12">
            <h2 className="text-xl font-normal text-[#4A1D96] mb-5 pb-3.5 border-b-2 border-[#E2D9F3]">
              ⏱ Deletion Timeline
            </h2>
            <div className="divide-y divide-[#E2D9F3]">
              {timelineItems.map((item) => (
                <div key={item.time} className="flex gap-5 py-4">
                  <span className="w-3 h-3 rounded-full bg-[#A855F7] mt-2 shrink-0" />
                  <div>
                    <strong className="block text-sm font-semibold text-[#4A1D96] mb-0.5">{item.time}</strong>
                    <span className="text-sm text-[#6B7280]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#4A1D96] text-white rounded-2xl p-8">
            <h2 className="text-xl font-normal text-white mb-3.5">Need Help?</h2>
            <p className="text-white/80 mb-2.5">
              If you have any questions about data deletion or need assistance with your request, our privacy team is here to help.
            </p>
            <p className="text-white/80 mb-2.5">
              📧 Email:{" "}
              <a href="mailto:privacy@uecampus.com" className="text-[#A855F7] font-semibold no-underline">
                privacy@uecampus.com
              </a>
            </p>
            <p className="text-white/80 mb-2.5">
              🌐 Website:{" "}
              <a href="https://uecampus.com" className="text-[#A855F7] font-semibold no-underline">
                uecampus.com
              </a>
            </p>
            <p className="text-white/60 text-sm mt-3">
              We aim to respond to all privacy-related requests within <strong className="text-white">48 hours</strong>.
            </p>
          </div>

        </div>
      </main>

     

    </div>
  );
}