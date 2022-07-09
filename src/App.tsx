import { ChangeEvent, useCallback, useState } from "react";
import Filters from "./components/Filters";
import CharacterCard from "./components/CharacterCard";
import InfiniteList from "./components/InfiniteList";
import useFetchPage from "./hooks/use-fetch-page";
import useScrollEnd from "./hooks/use-scroll-end";
import { CharacterStatus, CharacterData } from "./types";

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CharacterStatus>("");
  const pickValues = useCallback(
    (item: CharacterData) => ({
      id: item.id,
      name: item.name,
      status: item.status,
      image: item.image,
    }),
    []
  );
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as CharacterStatus;
    setStatus(value);
  };

  const isScrollEnd = useScrollEnd();
  const data = useFetchPage<CharacterData>({
    url: "https://rickandmortyapi.com/api/character",
    params: {
      name: search,
      status,
    },
    shouldFetch: isScrollEnd,
    preprocess: pickValues,
  });

  return (
    <>
      <Filters
        status={status}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
      />
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
