import { ChangeEvent, useCallback, useState } from "react";
import {
  AppBar,
  FormControlLabel,
  Radio,
  RadioGroup,
  Input,
} from "@mui/material";
import CharacterCard from "./components/CharacterCard";
import InfiniteList from "./components/InfiniteList";
import useFetchPage from "./hooks/use-fetch-page";
import useScrollEnd from "./hooks/use-scroll-end";
import { CharacterStatus, CharacterData } from "./types";

function App() {
  // There's no "any" option in API for status.
  // Empty string used to query characters with any status.
  const statuses: CharacterStatus[] = ["", "alive", "dead", "unknown"];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
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
  const handleStatus = (event: ChangeEvent<HTMLInputElement>) => {
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
      <AppBar
        component="nav"
        position="sticky"
        color="default"
        sx={{ flexDirection: "row", paddingX: 3, paddingY: 2 }}
      >
        <Input
          onChange={handleSearch}
          placeholder="Search"
          sx={{ flexGrow: 1, marginRight: 3 }}
        />
        <RadioGroup value={status} onChange={handleStatus} row color="inherit">
          {statuses.map((status) => (
            <FormControlLabel
              key={status}
              control={<Radio />}
              value={status}
              label={status ? status : "any"}
            />
          ))}
        </RadioGroup>
      </AppBar>
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
