import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { objectsEqual } from "../utils";

interface useFetchPageParams<T> {
  url: string;
  params: { [key: string]: string };
  shouldFetch: boolean;
  preprocess: (item: T) => T;
}

const useFetchPage = <T>({
  url,
  params,
  shouldFetch,
  preprocess,
}: useFetchPageParams<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>();
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const paramsRef = useRef(params);
  const pageRef = useRef(page);

  if (!objectsEqual(paramsRef.current, params)) {
    paramsRef.current = params;
  }

  useEffect(() => {
    // If page didn't change, url or params changed
    // so data and page should be resetted.
    // `page !== 1` used to exclude case when page is resetted.
    const pageChanged = pageRef.current !== page && page !== 1;
    if (!pageChanged) {
      setPage(1);
    } else {
      pageRef.current = page;
    }
    const abortController = new AbortController();
    axios({
      method: "GET",
      url: url,
      params: { page, ...params },
      signal: abortController.signal,
    })
      .then(({ data: { results, info } }) => {
        setError(null);
        const nextPage = info.next;
        setHasNextPage(!!nextPage);
        const preprocessedResults = results.map(preprocess);
        if (pageChanged) {
          setData((prev) => [...prev, ...preprocessedResults]);
        } else {
          setData(preprocessedResults);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(error.response.data.error);
      });
    return () => abortController.abort();
  }, [url, page, paramsRef.current]);

  useEffect(() => {
    if (hasNextPage && shouldFetch) setPage((prev) => prev + 1);
  }, [hasNextPage, shouldFetch]);

  return { data, error };
};

export default useFetchPage;
