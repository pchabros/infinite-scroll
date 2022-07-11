import React, { ChangeEvent, FC } from "react";
import {
  AppBar,
  FormControlLabel,
  Radio,
  RadioGroup,
  Input,
  useMediaQuery,
  FormControlLabelProps,
} from "@mui/material";
import { CharacterStatus } from "../types";

interface FiltersProps {
  status: CharacterStatus;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Filters: FC<FiltersProps> = ({ status, onSearch, onStatusChange }) => {
  // There's no "any" option in API for status.
  // Empty string used to query characters with any status.
  const statuses: CharacterStatus[] = ["", "alive", "dead", "unknown"];
  const isPhone = useMediaQuery("(max-width: 500px)");
  const radioLabelPlacement = (
    isPhone ? "bottom" : "end"
  ) as FormControlLabelProps["labelPlacement"];
  return (
    <AppBar
      component="nav"
      position="sticky"
      color="default"
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingX: 3,
        paddingY: 2,
      }}
    >
      <Input
        onChange={onSearch}
        placeholder="Search"
        sx={{ flexGrow: 1, marginRight: 3, marginBottom: isPhone ? 2 : 0 }}
      />
      <RadioGroup value={status} onChange={onStatusChange} row color="inherit">
        {statuses.map((status) => (
          <FormControlLabel
            key={status}
            control={<Radio />}
            value={status}
            label={status ? status : "any"}
            labelPlacement={radioLabelPlacement}
          />
        ))}
      </RadioGroup>
    </AppBar>
  );
};

export default Filters;
