//Remove valores duplicados num array
export const removeDuplicatesInArray = <T>(array: T[]) => {
  return array.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t === value)
  );
};
