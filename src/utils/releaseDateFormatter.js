export const releaseDateFormatter = (yearList) => {
  const years = yearList.map((date) => (date ? date.slice(0, 4) : ''));
  const uniqueYears = [...new Set(years)];
  const sortedYears = uniqueYears.sort((a, b) => b - a);
  return sortedYears;
}
