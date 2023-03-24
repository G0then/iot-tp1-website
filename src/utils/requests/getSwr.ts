import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchAPI } from "./fetchAPI";

// const fetcher = (query: string, variables?: object) => fetch('http://127.0.0.1:8080', query, variables);

export const fetcher = <T>(url: string, customOptions?: any) => {
  //Prenche os headers
  const { headers } = customOptions || {};

  //Faz o pedido GET com o URL e os headers especificados
  return fetchAPI<T | any>(
    url,
    { method: "GET", headers }
  );
};

export const useQuery = <T>(url: string | null, options?: any) => {
  // O useSWR:
  // - Revalida os dados no re-focus da página ou quando se trocam entre tabs;
  // - revalida os dados entre intervalos (quando especificado);
  // - revalida os dados quando o utilizador volta a reconectar-se;
  const { headers, ...swrOptions } = options || {}; //Desconstrutor do objeto das options

  //As options para o swr vão apenas para os swr e as restantes são enviadas para o fetcher
  return useSWR<T, Error>(
    url,
    (url: string) => fetcher(url, { headers }),
    swrOptions
  );
};

export const useDebounceQuery = (
  query: string | null
) => {
  const debouncedSearch = useDebounce(query, 500);

  return useSWR(debouncedSearch, fetcher);
};

export const useDebounce = (
  value: string | null,
  delay: number,
) => {
  const [debouncedValue, setDebouncedValue] = useState([value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue([value]);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

