import { useEffect, useState } from "react";

/**
 * @returns La chiave API
 */
const getApiKey = (): string => {
  let apiKey = "";
  try {
    const zustandData = localStorage.getItem("api-key-storage");
    if (zustandData) {
      const parsed = JSON.parse(zustandData);
      apiKey = parsed.state?.apiKey || "";
    }
  } catch (e) {
    apiKey = "";
  }
  if (!apiKey) {
    apiKey = import.meta.env.VITE_API_KEY;
  }
  return apiKey;
};

/**
 * @param id 
 * @returns 
 */
export const getRecipeDetailsURL = (id: number) => {
  const ENDPOINT = `/recipes/${id}/information`;
  const apiKey = getApiKey();
  return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?apiKey=${apiKey}`;
};

interface UseApiReturn<T> {
  data: T | T[] | null;
  loading: boolean;
  error: string | null;
}

/**
 * @param url 
 * @returns 
 */
export function useApi<T = any>(url: string): UseApiReturn<T> {
  const [data, setData] = useState<T | T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        const result = await response.json();

        if (!cancelled) {
          if (Array.isArray(result)) {
            setData(result as T[]);
          } else if (result && Array.isArray(result.results)) {
            setData(result.results as T[]);
          } else if (result && typeof result === "object") {
            setData(result as T);
          } else {
            setData(null);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (url.length > 0) fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

/**
 * @param query 
 * @returns 
 */
export const getIngredientsURL = (query: string) => {
  const ENDPOINT = "/food/ingredients/search";
  const RESULTS_NUM = 10;
  const apiKey = getApiKey();
  return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?apiKey=${apiKey}&query=${query}&number=${RESULTS_NUM}`;
};

/**
 * @param ingredients - 
 * @returns 
 */
export const getRecipesByIngredientsURL = (ingredients: string[]) => {
  const ENDPOINT = "/recipes/findByIngredients";
  const RESULTS_NUM = 20;
  const query = ingredients.join(",");
  const apiKey = getApiKey();
  return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?apiKey=${apiKey}&ingredients=${query}&number=${RESULTS_NUM}`;
};
