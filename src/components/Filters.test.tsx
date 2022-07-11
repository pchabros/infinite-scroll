import React from "react";
import { render, screen } from "@testing-library/react";
import Filters from "./Filters";
import { CharacterStatus } from "../types";

const FiltersElement = (
  <Filters
    status=""
    onSearch={() => {
      return;
    }}
    onStatusChange={() => {
      return;
    }}
  />
);

test("renders search input", () => {
  render(FiltersElement);
  const searchElement = screen.getByPlaceholderText("Search");
  expect(searchElement).toBeInTheDocument();
});

test("renders status buttons", () => {
  render(FiltersElement);
  const statusButtonsElement = screen.getByRole("radiogroup");
  expect(statusButtonsElement).toBeInTheDocument();
});

test("status buttons has correct values", () => {
  render(FiltersElement);
  const statusOptionsElements = screen.getAllByRole("radio");
  const statuses: CharacterStatus[] = ["", "alive", "dead", "unknown"];
  statusOptionsElements.forEach((option, i) => {
    expect(option.getAttribute("value")).toBe(statuses[i]);
  });
});
