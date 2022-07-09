import axios from "axios";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import InfiniteList from "./components/InfiniteList";
import CharacterCard from "./components/CharacterCard";
import { Input } from "@mui/material";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([{ id: 0, name: "", image: "" }]);
  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  useEffect(() => {
    const abortController = new AbortController();
    axios({
      method: "GET",
      url: "https://rickandmortyapi.com/api/character",
      params: { name: search, page: page },
      signal: abortController.signal,
    })
      .then((result) => {
        setData(result.data.results);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
      });
    return () => abortController.abort();
  }, [page, search]);
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
