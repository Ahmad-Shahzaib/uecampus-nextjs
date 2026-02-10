// src/component/faqs/ErrorState.tsx
"use client";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <section 
      className="relative min-h-screen overflow-hidden text-white font-sans flex items-center justify-center"
      style={{
        backgroundImage: `
          url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
          linear-gradient(to bottom, rgb(27 35 42), rgb(27 35 42))
        `,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
      <div className="relative z-10 text-center px-4">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-semibold mb-4">Oops! Something went wrong</h1>
        <p className="text-red-400 mb-6 max-w-md mx-auto">
          {error || "Failed to load FAQs. Please try again."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </section>
  );
};

export default ErrorState;