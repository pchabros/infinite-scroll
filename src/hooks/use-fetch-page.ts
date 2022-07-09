import axios from "axios";
import { useEffect, useState } from "react";

interface useFetchPageParams<T> {
  url: string;
  search: string;
  shouldFetch: boolean;
  preprocess: (results: T) => T;
}

const useFetchPage = <T>({
  url,
  search,
  shouldFetch,
  preprocess,
}: useFetchPageParams<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    axios({
      method: "GET",
      url: url,
      params: { name: search, page: page },
      signal: abortController.signal,
    })
      .then(({ data: { results, info } }) => {
        const nextPage = info.next;
        setHasNextPage(!!nextPage);
        const preprocessedResults = results.map(preprocess);
        setData((prev) => [...prev, ...preprocessedResults]);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
      });
    return () => abortController.abort();
  }, [url, page, search, preprocess]);

  useEffect(() => {
    if (hasNextPage && shouldFetch) setPage((prev) => prev + 1);
  }, [hasNextPage, shouldFetch]);

  // reset data and page when inputs changes
  useEffect(() => {
    setData([]);
    setPage(1);
  }, [search]);

  return data;
};

export default useFetchPage;
