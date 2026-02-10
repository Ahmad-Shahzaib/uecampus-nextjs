"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchBlogs, fetchSearchBlogs } from "@/redux/thunk/blogsThunk";
import Loader from "@/components/common/Loader";
import { getBlogImageUrl } from '@/lib/utils';

const BlogCard: React.FC<{
  image?: string;
  title?: string;
  category?: string | null;
  slug?: string;
}> = ({ image, title, category, slug }) => {
  const href = slug ? `/blogs/detail?slug=${slug}` : `/blogs/detail`;
  return (
    <Link href={href} className="block">
      <div className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
        <div className="relative h-64 overflow-hidden">
          <div className="relative w-full h-full bg-gray-200">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={getBlogImageUrl(image)} alt={title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            ) : null}
          </div>
          <div className="absolute top-4 left-4 z-20">
            {category ? (
              <span className="inline-block bg-purple-800 text-white px-4 py-1.5 text-xs font-semibold rounded-full shadow-lg">
                {category}
              </span>
            ) : null}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h1 className="text-lg font-bold text-white">{title}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

const BlogsList: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { items, isLoading, error, pagination, lastQuery } = useSelector((s) => (s as any).blogs ?? {
    items: [],
    isLoading: false,
    error: null,
    pagination: null,
    lastQuery: null,
  });

  useEffect(() => {
    // fetch base list on mount
    dispatch(fetchBlogs({ page: 1, per_page: 12 }));
  }, [dispatch]);

  const handleSearch = () => {
    const q = query?.trim();
    if (q) {
      dispatch(fetchSearchBlogs({ q, page: 1, per_page: 12 }));
    } else {
      dispatch(fetchBlogs({ page: 1, per_page: 12 }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handlePrev = () => {
    const page = (pagination?.current_page ?? 1) - 1;
    if (!pagination || page < 1) return;
    if (lastQuery) {
      dispatch(fetchSearchBlogs({ q: lastQuery, page, per_page: 12 }));
    } else {
      dispatch(fetchBlogs({ page, per_page: 12 }));
    }
  };

  const handleNext = () => {
    const page = (pagination?.current_page ?? 1) + 1;
    if (!pagination || page > (pagination?.last_page ?? 1)) return;
    if (lastQuery) {
      dispatch(fetchSearchBlogs({ q: lastQuery, page, per_page: 12 }));
    } else {
      dispatch(fetchBlogs({ page, per_page: 12 }));
    }
  };

  const clearSearch = () => {
    setQuery("");
    dispatch(fetchBlogs({ page: 1, per_page: 12 }));
  };

  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        {pagination ? (
          <div className="text-sm text-gray-500">Page {pagination.current_page} of {pagination.last_page}</div>
        ) : null}
      </div> */}

          <div className="mb-8">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search blogs..."
            className="w-full rounded-md border px-3 py-2"
          />
          <button onClick={handleSearch} className="px-4 py-2 bg-purple-700 text-white rounded">Search</button>
          {lastQuery ? (
            <button onClick={clearSearch} className="px-3 py-2 bg-gray-200 rounded">Clear</button>
          ) : null}
        </div>
        {lastQuery ? (
          <div className="text-sm text-gray-600 mt-2 text-center">Search results for "{lastQuery}"</div>
        ) : null}
      </div>

      {isLoading ? (
        <div className="w-full py-12 flex items-center justify-center">
          <Loader size={88} text="Loading blogs..." />
        </div>
      ) : error ? (
        <div className="text-red-500">{String(error)}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((b: any) => (
            <BlogCard key={b.id} image={b.image} title={b.name} category={b?.category?.title ?? b.cat_id} slug={b.slug} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-12">
        <button
          onClick={handlePrev}
          disabled={!pagination || (pagination.current_page ?? 1) <= 1}
          className="px-4 py-2 mr-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          disabled={!pagination || (pagination.current_page ?? 1) >= (pagination?.last_page ?? 1)}
          className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default BlogsList;
