export default function usePaginationBounds(
  page: number,
  itemsPerPage: number,
  totalItems: number
) {
  function lowerBound() {
    return (page - 1) * itemsPerPage;
  }

  function upperBound() {
    return Math.min(page * itemsPerPage, totalItems);
  }

  return { lowerBound, upperBound };
}
