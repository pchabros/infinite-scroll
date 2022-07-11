import React, { ReactNode } from "react";

interface InfiniteListProps<T> {
  data: T[];
  renderItem: (item: T) => ReactNode;
}

const InfiniteList = <T,>({ data, renderItem }: InfiniteListProps<T>) => {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {data.map((d) => renderItem(d))}
    </div>
  );
};

export default InfiniteList;
