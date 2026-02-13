import { Source } from "three";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "newwebsite.uecampus.com",
      "images.unsplash.com",
      "cdn.pixabay.com",
      "res.cloudinary.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "example.com",
      "uecampus.com",
      "new.uecampus.com",
      "i.ytimg.com"
    ],
  },

  async headers() {
    // long cache for build/static assets, moderate for image files, short/no-cache for HTML pages
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/:all*.(js|css|woff2|woff|png|jpg|jpeg|webp|avif|svg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }
        ]
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }
        ]
      }
    ];
      const csp = "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.googletagmanager.com/gtm.js; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; frame-src https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; form-action 'self'";

      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
            {
              key: "Content-Security-Policy",
              value: csp,
            },
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
            {
              key: "Permissions-Policy",
              value: "geolocation=(), microphone=()",
            },
            {
              key: "Strict-Transport-Security",
              value: "max-age=63072000; includeSubDomains; preload",
            },
          ],
        },
      ];
  },
  async redirects() {
    return [
      {
        source: "/old-blog/:slug*",
        destination: "/blogs/:slug*",
        permanent: true,
      },
      {
        source: "/old-courses/:id",
        destination: "/courses/:id",
        permanent: true,
      },
      {
        source: "/old-about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/old-contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/old-faqs",
        destination: "/faqs",
        permanent: true,

      },
      {
        source: "/old-scholarship",
        destination: "/scholarship",
        permanent: true,

      },
      {
        source: "/old-programs/:id",
        destination: "/program/:id",
        permanent: true,  
      },
      {
        source:"/old-accreditation",
        destination:"/accreditation-partners",
        permanent:true,
      }
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });

export default withBundleAnalyzer(nextConfig);
