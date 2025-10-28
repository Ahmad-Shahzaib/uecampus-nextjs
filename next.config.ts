/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "newwebsite.uecampus.com", // 👈 add this line
      "images.unsplash.com",
      "cdn.pixabay.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
