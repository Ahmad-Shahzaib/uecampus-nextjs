// Client-side redirect to the canonical course detail route
"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    useEffect(() => {
        if (slug) {
            router.replace(`/course/${slug}`);
        }
    }, [router, slug]);

    return null;
};

export default Page