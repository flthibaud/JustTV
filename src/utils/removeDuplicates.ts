export function removeDuplicates(items, keyExtractor) {
  const unique = new Map();
  items.forEach((item) => {
    const key = keyExtractor(item);
    if (!unique.has(key)) {
      unique.set(key, item);
    }
  });
  return Array.from(unique.values());
}