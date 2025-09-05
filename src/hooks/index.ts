import { useState, useEffect } from 'react';

// Custom hook for managing loading state
export const useLoading = (initialState: boolean = false) => {
  const [loading, setLoading] = useState(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { loading, startLoading, stopLoading };
};

// Custom hook for API calls
export const useApi = <T>(apiFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { loading, startLoading, stopLoading } = useLoading();

  const execute = async () => {
    try {
      startLoading();
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return { data, error, loading, refetch: execute };
};
