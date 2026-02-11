"use client";
import { useEffect } from "react";

interface CourseProps {
  course: any;
}

export default function JsonLdCourse({ course }: CourseProps) {
  useEffect(() => {
    if (!course) return;

    const data = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.name || course.title || "UECampus Course",
      description: (course.description || course.short_description || "")
        .replace(/<[^>]*>/g, "")
        .slice(0, 1000),
      provider: {
        "@type": "Organization",
        name: "UECampus",
        sameAs: "https://www.uecampus.com",
      },
      url: (course.url || `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.uecampus.com"}/course/${course.slug}`),
      image: course.image_path || course.image || undefined,
      courseCode: course.code || undefined,
      educationalCredentialAwarded: course.credential || undefined,
    };

    const id = `ld-course-${course.id || course.slug}`;
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = id;
    s.text = JSON.stringify(data);
    document.head.appendChild(s);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [course]);

  return null;
}
