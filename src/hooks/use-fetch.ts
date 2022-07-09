import axios from "axios";
import { useEffect, useState } from "react";

interface useFetchParams<T> {
  search: string;
  page: number;
  handleResults: (results: T[]) => void;
}

const useFetch = <T>({ search, page, handleResults }: useFetchParams<T>) => {
  const [hasNextPage, setHasNextPage] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    axios({
      method: "GET",
      url: "https://rickandmortyapi.com/api/character",
      params: { name: search, page: page },
      signal: abortController.signal,
    })
      .then(({ data: { results, info } }) => {
        const nextPage = info.next;
        setHasNextPage(!!nextPage);
        handleResults(results);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
      });
    return () => abortController.abort();
  }, [page, search, handleResults]);
  return hasNextPage;
};

export default useFetch;
