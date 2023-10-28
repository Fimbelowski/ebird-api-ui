import { useMemo } from 'react';

export default function usePaginationBounds(
  page: number,
  itemsPerPage: number,
  totalItems: number
) {
  const lowerBound = useMemo(
    () => (page - 1) * itemsPerPage,
    [page, itemsPerPage]
  );

  const upperBound = useMemo(
    () => Math.min(page * itemsPerPage, totalItems),
    [page, itemsPerPage, totalItems]
  );

  return { lowerBound, upperBound };
}
