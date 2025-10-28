'use client';

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
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"
        alt="World Map"
        width={800}
        height={400}
        priority
        style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
      />
    </div>
  );
}
