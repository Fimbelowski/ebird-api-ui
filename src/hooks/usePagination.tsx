import { useEffect, useState } from 'react';

import usePaginationBounds from './usePaginationBounds';

export default function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const { lowerBound, upperBound } = usePaginationBounds(
    page,
    itemsPerPage,
    items.length
  );

  useEffect(() => {
    setPage(1);
  }, [items, itemsPerPage]);

  function paginatedItems() {
    return items.slice(lowerBound(), upperBound());
  }

  return {
    itemsPerPage,
    page,
    paginatedItems,
    setItemsPerPage,
    setPage,
  };
}
