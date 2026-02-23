  'use client';

  import React from 'react';

  const WhatsAppButton: React.FC = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '447586797014';
    const text = process.env.NEXT_PUBLIC_WHATSAPP_TEXT || '';
    const encoded = encodeURIComponent(text);
    const href = `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ''}`;

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="w-8 h-8"
        >
          <path d="M19.11 17.205c-.27-.135-1.593-.785-1.84-.875-.246-.09-.426-.135-.605.135-.18.27-.695.875-.852 1.055-.157.18-.314.202-.584.067-.27-.135-1.14-.42-2.172-1.342-.803-.716-1.345-1.6-1.503-1.87-.157-.27-.017-.416.118-.551.121-.12.27-.314.404-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.023-.472-.067-.135-.605-1.46-.83-2.002-.218-.525-.44-.454-.605-.462-.157-.007-.337-.009-.517-.009-.18 0-.472.067-.72.337-.247.27-.944.922-.944 2.25 0 1.327.967 2.61 1.102 2.79.135.18 1.902 2.9 4.604 4.07.643.277 1.145.443 1.537.567.646.206 1.233.177 1.696.107.517-.077 1.593-.652 1.817-1.282.225-.63.225-1.17.157-1.282-.067-.112-.247-.18-.517-.315z" />
          <path d="M16.002 3C8.82 3 3 8.82 3 16c0 2.828.923 5.437 2.482 7.56L3 29l5.64-2.448A12.93 12.93 0 0016.002 29C23.18 29 29 23.18 29 16S23.18 3 16.002 3zm0 23.4c-2.338 0-4.51-.684-6.338-1.86l-.454-.285-3.348 1.454.714-3.48-.295-.45A10.36 10.36 0 015.64 16c0-5.713 4.65-10.36 10.362-10.36 5.713 0 10.36 4.647 10.36 10.36 0 5.712-4.647 10.36-10.36 10.36z" />
        </svg>
      </a>
    );
  };

  export default WhatsAppButton;