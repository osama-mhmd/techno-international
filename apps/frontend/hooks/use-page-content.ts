import { useState, useEffect, useCallback } from "react";
import getContent from "../lib/get-content";

/**
 * Custom hook to fetch and provide page content for a React component.
 *
 * @param page The page identifier to fetch content for.
 * @returns An object containing the content lookup function, loading state, and any error.
 */
export function usePageContent(page: string) {
  const [contentLookup, setContentLookup] = useState<
    ((section: string, key: string) => string) | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setContentLookup(null);

    try {
      getContent(page).then((lookupFn) => {
        setContentLookup(() => lookupFn);
        setIsLoading(false);
      });
    } catch (err) {
      setError(err as Error);
    }
  }, [page]);

  const getContentValue = useCallback(
    (section: string, key: string): string => {
      if (!contentLookup) {
        return "";
      }
      return contentLookup(section, key);
    },
    [contentLookup]
  );

  return { content: getContentValue, isLoading, error };
}
