/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "newwebsite.uecampus.com", // 👈 add this line
      "images.unsplash.com",
      "cdn.pixabay.com",
      "res.cloudinary.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      'example.com',
      "uecampus.com"

    ],
  },
};

export default nextConfig;
