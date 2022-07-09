import { Input } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import CharacterCard from "./components/CharacterCard";
import InfiniteList from "./components/InfiniteList";
import useFetchPage from "./hooks/use-fetch-page";
import useScrollEnd from "./hooks/use-scroll-end";

type CharacterData = {
  id: number;
  name: string;
  image: string;
};

function App() {
  const [search, setSearch] = useState("");
  const preprocess = useCallback(
    (item: CharacterData) => ({
      id: item.id,
      name: item.name,
      image: item.image,
    }),
    []
  );
  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const isScrollEnd = useScrollEnd();
  const data = useFetchPage<CharacterData>({
    url: "https://rickandmortyapi.com/api/character",
    search,
    shouldFetch: isScrollEnd,
    preprocess,
  });

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
