const objectsEqual = (a: object, b: object) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const unique = <T>(array: T[]) => {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};

export { objectsEqual, unique };
