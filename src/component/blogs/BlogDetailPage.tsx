"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogBySlug } from '@/redux/thunk/blogDetailThunk';
import type { RootState } from '@/redux/rootReducer';
import { resetBlogDetail } from '@/redux/slices/blogDetailSlice';
import { getBlogImageUrl } from '@/lib/utils';

const BlogDetailPage = () => {
    const [isContactVisible, setIsContactVisible] = useState(true);

    const toggleContact = () => {
        setIsContactVisible(!isContactVisible);
    };

    // Blog data (bound from API response)
    const searchParams = useSearchParams();
    const slug = searchParams?.get('slug') ?? '';

    const dispatch = useDispatch<any>();
    const { isLoading, error, item: blogItem } = useSelector(
        (state: RootState) => state.blogDetail ?? { isLoading: false, error: null, item: null }
    );

    useEffect(() => {
        if (slug) dispatch(fetchBlogBySlug(slug));
        return () => {
            dispatch(resetBlogDetail());
        };
    }, [slug, dispatch]);

    // Image base (use env var if available, otherwise fall back to default WP uploads path)
    const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? 'https://newwebsite.uecampus.com/wp-content/uploads/';

    // Bind all display fields to API data (minimal safe fallbacks)
    const resolvedBlog = {
        title: blogItem?.name ?? '',
        category: blogItem?.category?.title ?? '',
        author: {
            name: blogItem?.author?.name ?? '',
            avatar: getBlogImageUrl(blogItem?.author?.avatar) ?? '',
            role: blogItem?.author?.role ?? '',
            bio: blogItem?.author?.bio ?? ''
        },
        publishDate: blogItem?.created_at ? new Date(blogItem.created_at).toLocaleDateString() : '',
        readTime: blogItem?.read_time ?? '',
        featuredImage: getBlogImageUrl(blogItem?.image) ?? '',
        content: blogItem?.content ?? '',
        tags: blogItem?.meta_tags ? blogItem.meta_tags.split(',').map((t: string) => t.trim()) : []
    }; 

    // Related posts (use API provided related posts when available)
    const relatedPosts = blogItem?.related_posts?.map((p: any) => ({
        title: p.name ?? p.title ?? '',
        category: p.category?.title ?? '',
        image: getBlogImageUrl(p.image) ?? '',
        date: p.created_at ? new Date(p.created_at).toLocaleDateString() : ''
    })) ?? [];


    // Table of contents
    const tableOfContents = [
        { id: 'what-is-mrp', title: 'What is Material Requirements Planning?' },
        { id: 'benefits', title: 'The Key Benefits of MRP' },
        { id: 'process', title: 'The MRP Process Explained' },
        { id: 'challenges', title: 'Common Challenges in MRP Implementation' },
        { id: 'best-practices', title: 'Best Practices for MRP Success' },
        { id: 'future', title: 'The Future of MRP' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Floating Contact Icons - Right Side */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
                <div
                    className={`bg-black rounded-l-full transition-all duration-300 ease-in-out ${isContactVisible ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col items-center py-4 px-3 space-y-4">
                        <a
                            href="mailto:contact@example.com"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-purple-400 transition-all duration-300 group"
                            aria-label="Email"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a
                            href="tel:+1234567890"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-purple-400 transition-all duration-300 group"
                            aria-label="Phone"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </a>
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-purple-400 transition-all duration-300 group"
                            aria-label="WhatsApp"
                        >
                            <svg className="w-6 h-6 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <button
                    onClick={toggleContact}
                    className={`absolute top-1/2 -translate-y-1/2 w-10 h-16 bg-black rounded-l-full flex items-center justify-center transition-all duration-300 hover:bg-gray-900 ${isContactVisible ? '-left-10' : 'left-0'
                        }`}
                    aria-label="Toggle Contact"
                >
                    <svg className={`w-5 h-5 text-white transition-transform duration-300 ${isContactVisible ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative h-[60vh]">
                <Image
                    src={resolvedBlog.featuredImage}
                    alt={resolvedBlog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6">
                        <div className="max-w-4xl">
                            {/* Breadcrumb */}
                            <nav className="mb-6">
                                <ol className="flex items-center space-x-2 text-sm text-gray-300">
                                    <li><a href="/" className="hover:text-white">Home</a></li>
                                    <li>/</li>
                                    <li><a href="/blogs" className="hover:text-white">Blogs</a></li>
                                    <li>/</li>
                                    <li className="text-purple-800">{resolvedBlog.category}</li>
                                </ol>
                            </nav>

                            {/* Category Badge */}
                            <div className="mb-4">
                                <span className="inline-block bg-purple-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                                    {resolvedBlog.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {resolvedBlog.title}
                            </h1>

                            {/* Author and Meta Info */}
                            {/* <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-8">
                                <div className="flex items-center">
                                    {resolvedBlog.author?.avatar ? (
                                        <img src={resolvedBlog.author.avatar} alt={resolvedBlog.author.name} className="w-12 h-12 rounded-full mr-3 object-cover" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-400 mr-3" />
                                    )}
                                    <div>
                                        <p className="font-semibold text-white">{resolvedBlog.author?.name || ''}</p>
                                        <p className="text-sm text-gray-300">{resolvedBlog.author?.role || ''}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {resolvedBlog.publishDate}
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {resolvedBlog.readTime}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar - Table of Contents */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                {/* <h1 className="text-lg font-bold mb-4 text-gray-900">Table of Contents</h1>
                                <nav>
                                    <ul className="space-y-2">
                                        {tableOfContents.map((item, index) => (
                                            <li key={index}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className="text-gray-600 hover:text-purple-700 text-sm transition-colors block py-1"
                                                >
                                                    {item.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav> */}

                                {/* Share Buttons */}
                                <div className="   border-gray-200">
                                    <h1 className="text-sm font-semibold mb-3 text-gray-900">Share this article</h1>
                                    <div className="flex space-x-2">
                                        <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </button>
                                        <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </button>
                                        <button className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Article */}
                    <article className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Featured Image */}
                            <div className="h-96 relative">
                                <Image
                                    src={resolvedBlog.featuredImage}
                                    alt={resolvedBlog.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-8">
                                <div
                                    className="prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-purple-700 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900
                    prose-ul:my-6 prose-li:text-gray-700
                    prose-ol:my-6"
                                    dangerouslySetInnerHTML={{ __html: resolvedBlog.content }}
                                />

                                {/* Tags */}
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <h1 className="text-sm font-semibold mb-4 text-gray-900">Tags:</h1>
                                    <div className="flex flex-wrap gap-2">
                                        {resolvedBlog.tags.map((tag: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Author Bio */}
                                {/* <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                                    <div className="flex items-start">
                                        <div className="w-20 h-20 rounded-full bg-gray-400 flex-shrink-0"></div>
                                        <div className="ml-6">
                                            <h1 className="text-xl font-bold text-gray-900 mb-1">{resolvedBlog.author?.name || ''}</h1>
                                            <p className="text-purple-700 font-medium mb-3">{resolvedBlog.author?.role || ''}</p>
                                            <p className="text-gray-700">{resolvedBlog.author?.bio || ''}</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="mt-16">
                            <h1 className="text-3xl font-bold mb-8 text-gray-900">Related Articles</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((post: { title: string; category: string; image: string; date: string }, index: number) => (
                                    <Link key={index} href="/blogs/detail" className="block">
                                        <div className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow">
                                            <div className="h-48 ">
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    width={400}
                                                    height={250}
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <span className="text-xs font-semibold text-purple-700 mb-2 block">{post.category}</span>
                                                <h1 className="font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                                                    {post.title}
                                                </h1>
                                                <p className="text-sm text-gray-600">{post.date}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Comments Section */}
                        {/* <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
                            <h1 className="text-2xl font-bold mb-6 text-gray-900">Leave a Comment</h1>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                                    />
                                </div>
                                <textarea
                                    rows={5}
                                    placeholder="Your Comment"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Submit Comment
                                </button>
                            </form>
                        </div> */}
                    </article>
                </div>
            </div>
        </div>
        

    );
    
};


export default BlogDetailPage;