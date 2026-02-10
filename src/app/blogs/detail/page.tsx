import { Suspense } from 'react';
import BlogDetailPage from '@/component/blogs/BlogDetailPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <BlogDetailPage />
    </Suspense>
  );
}
