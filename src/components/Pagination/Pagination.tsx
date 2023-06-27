import { useEffect, useState } from 'react';

import Button from '../Button/Button';
import { Select, type SelectOptionArray } from '../Select/Select';

interface Props<T> {
  items: T[];
  onPaginatedItemsChange: (newlyPaginatedItems: T[]) => void;
}

export default function PaginationControls<T>({
  items,
  onPaginatedItemsChange,
}: Props<T>) {
  const [itemsPerPage, setItemsPerPage] = useState('15');
  const [page, setPage] = useState(1);

  const itemsPerPageOptions: SelectOptionArray<string> = [
    {
      label: '15',
      value: '15',
    },
    {
      label: '20',
      value: '20',
    },
    {
      label: '25',
      value: '25',
    },
    {
      label: '50',
      value: '50',
    },
    {
      label: '100',
      value: '100',
    },
  ];

  useEffect(() => {
    onPaginatedItemsChange(getPaginatedItems());
  }, [page, itemsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [items, itemsPerPage]);

  function itemsPerPageAsNumber() {
    return parseInt(itemsPerPage, 10);
  }

  function getPaginatedItems() {
    return items.slice(paginatedItemsLowerBound(), paginatedItemsUpperBound());
  }

  function nextPageButtonsDisabled() {
    return page === totalNumberOfPages();
  }

  function onFirstPageClick() {
    setPage(1);
  }

  function onLastPageClick() {
    setPage(totalNumberOfPages());
  }

  function onNextPageClick() {
    setPage(page + 1);
  }

  function onPreviousPageClick() {
    setPage(page - 1);
  }

  function paginatedItemsLowerBound() {
    return (page - 1) * itemsPerPageAsNumber();
  }

  function paginatedItemsUpperBound() {
    return Math.min(page * itemsPerPageAsNumber(), items.length);
  }

  function paginationInfo() {
    const lowerBoundString = (paginatedItemsLowerBound() + 1).toLocaleString();
    const upperBoundString = paginatedItemsUpperBound().toLocaleString();
    const totalItemsString = items.length.toLocaleString();

    return `Showing ${lowerBoundString} - ${upperBoundString} of ${totalItemsString}`;
  }

  function peviousPageButtonsDisabled() {
    return page === 1;
  }

  function totalNumberOfPages() {
    return Math.ceil(items.length / itemsPerPageAsNumber());
  }

  return (
    <div className="pagination">
      <div className="pagination__info">{paginationInfo()}</div>
      <div className="pagination__controls">
        <Button
          disabled={peviousPageButtonsDisabled()}
          onClick={onPreviousPageClick}
          type="button"
        >
          Previous
        </Button>
        <Button
          onClick={onFirstPageClick}
          type="button"
        >
          1
        </Button>
        <Button
          onClick={onLastPageClick}
          type="button"
        >
          {totalNumberOfPages()}
        </Button>
        <Button
          disabled={nextPageButtonsDisabled()}
          onClick={onNextPageClick}
          type="button"
        >
          Next
        </Button>
        <Select
          id="items-per-page"
          inline
          label="Items Per Page"
          onChange={setItemsPerPage}
          options={itemsPerPageOptions}
          value={itemsPerPage}
        />
      </div>
    </div>
  );
}
