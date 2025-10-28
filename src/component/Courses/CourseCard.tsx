"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function ProgramCard({ item }: { item: any }) {
  return (
    <article className="w-full overflow-hidden rounded-3xl bg-[#111827] shadow-2xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        {/* Badge */}
        <div className="mb-6">
          <Badge
            variant="secondary"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-purple-600"
          >
            {item.name}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-xl sm:text-2xl font-semibold text-white leading-snug">
          {item.title}
        </h1>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {item.detail}
        </p>
      </div>

      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-t-2xl">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          className="object-cover w-full h-56"
        />
      </div>
    </article>
  );
}
