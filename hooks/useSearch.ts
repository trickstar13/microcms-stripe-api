import { useCallback, useState } from 'react';
import type { Result } from '../types/result';

type UseSearch = (
  keyword?: string
) => [Result | null, any, boolean, () => void];

export const useSearch: UseSearch = (keyword) => {
  const [result, setResult] = useState<[Result | null, any]>([null, null]);
  const [loading, setLoading] = useState<boolean>(false);

  const search = useCallback(() => {
    setLoading(true);
    fetch(`/api/search?keyword=${keyword}`)
    .then((res) => res.json())
    .then((data) => {
      setLoading(false);
      setResult([
        data || {
          Items: [],
          TotalResultCount: 0
        },
        null
      ]);
    })
    .catch((error) => {
      setLoading(false);
      setResult([null, error]);
    });
  }, [keyword]);

  return [...result, loading, search];
};
