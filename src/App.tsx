import { ChangeEvent, useEffect, useState } from "react";
import CharacterCard from "./components/CharacterCard";
import ErrorMessage from "./components/ErrorMessage";
import Filters from "./components/Filters";
import InfiniteList from "./components/InfiniteList";
import useFetchPage from "./hooks/use-fetch-page";
import useScrollEnd from "./hooks/use-scroll-end";
import { CharacterData, CharacterStatus } from "./types";

const pickValues = (item: CharacterData) => ({
  id: item.id,
  name: item.name,
  status: item.status,
  image: item.image,
});

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CharacterStatus>("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as CharacterStatus;
    setStatus(value);
  };

  const isScrollEnd = useScrollEnd();
  const { data, error, resetted } = useFetchPage<CharacterData>({
    url: "https://rickandmortyapi.com/api/character",
    params: {
      name: search,
      status,
    },
    shouldFetch: isScrollEnd,
    preprocess: pickValues,
  });

  // Scroll back to top if filters has changed
  useEffect(() => {
    if (resetted) window.scrollTo({ top: 0 });
  }, [resetted]);

  return (
    <>
      <Filters
        status={status}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
      />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <InfiniteList
          data={data}
          renderItem={({ id, name, image }) => (
            <CharacterCard key={id} name={name} image={image} />
          )}
        />
      )}
    </>
  );
}

export default App;
