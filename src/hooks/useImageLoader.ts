import { useState, useEffect } from 'react';

interface UseImageLoaderReturn {
  isLoading: boolean;
  hasError: boolean;
  handleLoad: () => void;
  handleError: () => void;
  reset: () => void;
}

export const useImageLoader = (imageUrl?: string): UseImageLoaderReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const reset = () => {
    setIsLoading(true);
    setHasError(false);
  };

  // Reset states when image URL changes
  useEffect(() => {
    if (imageUrl) {
      reset();
    }
  }, [imageUrl]);

  return {
    isLoading,
    hasError,
    handleLoad,
    handleError,
    reset,
  };
};