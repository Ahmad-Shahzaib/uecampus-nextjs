'use client';               // <-- required for client-side Image in App Router

import Image from 'next/image';
import React from 'react';

export default function WorldMapVisualization() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '0 1rem',
        background: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <Image
        src="https://assets.grok.com/users/47827616-6e07-44d6-8646-e75c789df214/generated/d21ae70b-0f51-4b74-9ca7-83a8452adeb2/image.jpg"
        alt="World Map"
        width={800}
        height={600}
        priority
        style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+5PQAI8wN9Kq7Z7gAAAABJRU5ErkJggg=="
      />
    </div>
  );
}