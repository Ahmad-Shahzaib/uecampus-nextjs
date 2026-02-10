"use client";

import BlogHeroSection from '@/component/blogs/BlogHeroSection';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogsList from '@/component/blogs/BlogsList';
import { useDispatch, useSelector } from '@/redux/store';
import { fetchLatestBlogs } from '@/redux/thunk/blogsThunk';
import { sendContact } from '@/redux/thunk/contactThunk';
import Loader from '@/components/common/Loader';
import { getBlogImageUrl } from '@/lib/utils';
import Seo from '@/component/common/Seo';

// Main Blog Page Component - All in One
const BlogsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });

  const [activeCategory, setActiveCategory] = useState('General Management');



  // Bottom section blogs


  const handleFormChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(sendContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        message: formData.message,
      })).unwrap();
      // reset form on success
      setFormData({ name: '', email: '', phone: '', country: '', message: '' });
    } catch (err) {
      // error handled in slice; log for debugging
      console.error('Contact submit error:', err);
    }
  };

  // Blog Card Component (Inline)
  type BlogCardProps = {
    image: string;
    title: string;
    category: string;
    darkMode?: boolean;
    slug?: string; // Added slug parameter
  };

  const BlogCard: React.FC<BlogCardProps> = ({ image, title, category, darkMode = false, slug }) => {
    const href = slug ? `/blogs/detail?slug=${slug}` : `/blogs/detail`;
    return (
      <Link href={href} className="block">
        <div className={`group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 ${darkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
          <div className="relative h-64 overflow-hidden">
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${darkMode
                ? 'bg-gradient-to-b from-transparent via-transparent to-gray-900 opacity-70 group-hover:opacity-90'
                : 'bg-gradient-to-b from-transparent via-transparent to-black opacity-60 group-hover:opacity-80'
              }`} />

            {/* Image with gradient overlay */}
            <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-purple-700 to-purple-600">
              <img src={getBlogImageUrl(image)} alt={title} className="absolute  inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent" />
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-block bg-purple-800 text-white px-4 py-1.5 text-xs font-semibold   rounded-full shadow-lg">
                {category}
              </span>
            </div>

            {/* Read More Icon */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-purple-800 text-white p-2 rounded-full shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h1 className={`text-lg 0 font-bold leading-tight transition-all duration-300 ${darkMode ? 'text-white' : 'text-white'
                }  `}>
                {title}
              </h1>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  // ===== Latest blogs (from API) =====
  const dispatch = useDispatch();
  const { items: latestItems = [], isLoading: latestLoading, error: latestError } = useSelector((s) => (s as any).latestBlogs ?? { items: [], isLoading: false, error: null });
  const { data: contactResponse, isLoading: contactLoading, error: contactError, successMessage: contactSuccess } = useSelector((s) => (s as any).contact ?? { data: null, isLoading: false, error: null, successMessage: null });

  useEffect(() => {
    dispatch(fetchLatestBlogs({ limit: 6 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      <Seo pageKey="blogs" />

      <BlogHeroSection />

      {/* Featured / All Blogs Section (fetched) */}
      <BlogsList />

      {/* Explore latest Topics Section */}
      <section className="bg-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Top<br />Blog Topics
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
              At EBS, we make sure that our learners stay updated about the latest industry trends and market updates. We encourage our students to go beyond the traditional classroom experience and gain hands-on experience in various management methodologies. Explore our full-fledged blog library to find topics that interest you.
            </p>
          </div>

          {/* Topic Tabs */}


          {/* Topic Blogs Grid (shows latest posts from API) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestLoading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 flex items-center justify-center">
                <Loader size={48} text="Loading latest posts..." />
              </div>
            ) : latestError ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-red-400">{String(latestError)}</div>
            ) : (latestItems && latestItems.length > 0 ? (
              latestItems.map((b: any) => (
                <BlogCard key={b.id} image={b.image} title={b.name} category={b?.category?.title ?? b.cat_id} slug={b.slug} darkMode />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 flex items-center justify-center">
                <p className="text-gray-400">No blogs available.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Purple background with decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Title */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Speak to our<br />Team
              </h1>
              <p className="text-lg text-gray-100 max-w-md leading-relaxed">
                Have questions or need guidance? Our dedicated team is here to help you every step of the way. Reach out to us for personalized support!
              </p>
            </div>

            {/* Right side - Form */}
            <div className="bg-purple-700/90 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-transparent border-b-2 border-gray-700 focus:border-purple-400 text-white placeholder-gray-100 py-3 outline-none transition-colors"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full border-b-2 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-100 py-3 outline-none transition-colors"
                    required
                  />
                </div>

                {/* Mobile Input */}
                <div className="flex gap-4">
                  <div className="flex items-center bg-transparent border-b-2 border-gray-700 py-3">
                    <span className="text-white mr-2">🇵🇰</span>
                    <span className="text-white">+92</span>
                  </div>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="flex-1  border-b-2 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-100 py-3 outline-none transition-colors"
                    required
                  />
                </div>

                {/* Country Input */}
                {/* <div>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleFormChange}
                    className="w-full bg-transparent border-b-2 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-100 py-3 outline-none transition-colors"
                    required
                  />
                </div> */}

                {/* Message Input */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full  border-b-2 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-100 py-3 outline-none transition-colors"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={contactLoading}
                  aria-busy={contactLoading}
                  className={`w-full bg-purple-500 text-white font-bold py-4 rounded-lg hover:bg-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 ${contactLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {contactLoading ? 'Sending...' : 'Get Started'}
                </button>

                {contactLoading && <p className="text-sm text-gray-200 text-center mt-2">Sending your message…</p>}
                {contactSuccess && <p className="text-sm text-green-200 text-center mt-2">{contactSuccess}</p>}
                {contactError && <p className="text-sm text-red-400 text-center mt-2">{contactError}</p>}

                {/* Privacy Notice */}
                <p className="text-xs text-gray-400 text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="#" className="text-purple-400 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-yellow-400 hover:underline">
                    Terms of Service
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;