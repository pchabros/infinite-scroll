import { rest } from "msw";
import { setupServer } from "msw/node";
import mockData from "./mock-data";

const mockServer = setupServer(
  rest.get("/api", (req, res, ctx) => {
    const [page, name, status] = ["page", "name", "status"].map((d) =>
      req.url.searchParams.get(d)
    );
    const pageNum = page ? +page : page;
    const filteredData = mockData.filter((d) => {
      return (
        d.page === pageNum &&
        d.name.includes(name as string) &&
        (status === "all" || d.status === status)
      );
    });
    return res(ctx.json({ results: filteredData, info: { next: "2" } }));
  })
);

export default mockServer;
