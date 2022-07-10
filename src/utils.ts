const objectsEqual = (a: object, b: object) =>
  JSON.stringify(a) === JSON.stringify(b);

export { objectsEqual };
