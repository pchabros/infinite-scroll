import { Input } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CharacterCard from "./components/CharacterCard";
import InfiniteList from "./components/InfiniteList";
import useFetch from "./hooks/use-fetch";
import useScrollEnd from "./hooks/use-scroll-end";

type CharacterData = {
  id: number;
  name: string;
  image: string;
};

function App() {
  const [data, setData] = useState<CharacterData[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const handleResults = useCallback((results: CharacterData[]) => {
    const preprocessedResults = results.map((d) => ({
      id: d.id,
      name: d.name,
      image: d.image,
    }));
    setData((prev) => [...prev, ...preprocessedResults]);
  }, []);
  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setData([]);
    setPage(1);
    setSearch(event.target.value);
  }, []);
  const isScrollEnd = useScrollEnd();
  const hasNextPage = useFetch<CharacterData>({
    search,
    page,
    handleResults,
  });
  useEffect(() => {
    if (hasNextPage && isScrollEnd) setPage((prev) => prev + 1);
  }, [hasNextPage, isScrollEnd]);
  return (
    <>
      <Input onChange={handleSearch} />
      <InfiniteList
        data={data}
        renderItem={({ id, name, image }) => (
          <CharacterCard key={id} name={name} image={image} />
        )}
      />
    </>
  );
}

export default App;
