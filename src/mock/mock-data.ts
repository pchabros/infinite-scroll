const mockData = Array.from({ length: 20 }, (_, i) => {
  i++;
  return {
    id: i,
    name: `Character ${i}`,
    status: i % 2 === 0 ? "alive" : "dead",
    image: `image_${i}`,
    page: Math.ceil(i / 10),
  };
});

export default mockData;
