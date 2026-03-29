import { useState, useCallback } from 'react';
import { NormalizedError } from '../types';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: NormalizedError | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const normalizedError = error as NormalizedError;
      setState({ data: null, loading: false, error: normalizedError });
      throw normalizedError;
    }
  }, []);

  return { ...state, execute };
}
