import { renderHook, waitFor } from "@testing-library/react";
import mockServer from "../mock/mock-server";
import { CharacterData } from "../types";
import { unique } from "../utils";
import useFetchPage from "./use-fetch-page";

beforeEach(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test("should fetch first page data", async () => {
  const { result } = renderHook(() =>
    useFetchPage<CharacterData>({
      url: "api",
      params: { name: "", status: "all" },
      shouldFetch: false,
      preprocess: (d) => d,
    })
  );
  await waitFor(() => {
    const { data } = result.current;
    expect(data).toHaveLength(10);
    expect(unique(data.map((d) => d.page))).toEqual([1]);
  });
});

test("should append second page after `shouldFetch` changed to `true`", async () => {
  let shouldFetch = false;
  const { result, rerender } = renderHook(() =>
    useFetchPage<CharacterData>({
      url: "api",
      params: { name: "", status: "all" },
      shouldFetch: shouldFetch,
      preprocess: (d) => d,
    })
  );
  shouldFetch = true;
  rerender();
  await waitFor(() => {
    const { data } = result.current;
    expect(data).toHaveLength(20);
    expect(unique(data.map((d) => d.page))).toEqual([1, 2]);
  });
});

test("should overrite the data when `params` change", async () => {
  let status = "dead";
  const { result, rerender } = renderHook(() =>
    useFetchPage<CharacterData>({
      url: "api",
      params: { name: "", status: status },
      shouldFetch: false,
      preprocess: (d) => d,
    })
  );
  await waitFor(() => {
    const { data } = result.current;
    expect(unique(data.map((d) => d.status))).toEqual(["dead"]);
  });
  status = "alive";
  rerender();
  await waitFor(() => {
    const { data } = result.current;
    expect(unique(data.map((d) => d.status))).toEqual(["alive"]);
  });
});

// I would add more tests in real project.
