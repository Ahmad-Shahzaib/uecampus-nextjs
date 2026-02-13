interface CourseProps {
  course: any;
}

export default function JsonLdCourse({ course }: CourseProps) {
  if (!course) return null;

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

  return (
    <script
      type="application/ld+json"
      // Render JSON-LD server-side to avoid client-side JS
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
