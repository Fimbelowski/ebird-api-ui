import { useEffect, useState } from 'react';

import Button from '../Button/Button';
import { Select, type SelectOptionArray } from '../Select/Select';
import PageInput from '../PageInput';

interface Props<T> {
  items: T[];
  onPaginatedItemsChange: (newlyPaginatedItems: T[]) => void;
}

export default function PaginationControls<T>({
  items,
  onPaginatedItemsChange,
}: Props<T>) {
  const [goToPage, setGoToPage] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState('25');
  const [page, setPage] = useState(0);

  const itemsPerPageOptions: SelectOptionArray<string> = [
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
    {
      label: '250',
      value: '250',
    },
  ];

  useEffect(() => {
    onPaginatedItemsChange(getPaginatedItems());
  }, [page, itemsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [items, itemsPerPage]);

  function itemsPerPageAsNumber() {
    return parseInt(itemsPerPage, 10);
  }

  function getPaginatedItems() {
    const lowerIndexBound = Math.max(page * itemsPerPageAsNumber());
    const upperIndexBound = (page + 1) * itemsPerPageAsNumber();
    return items.slice(lowerIndexBound, upperIndexBound);
  }

  function nextPageButtonsDisabled() {
    return page === totalNumberOfPagesAsIndex();
  }

  function onFirstPageClick() {
    setPage(0);
  }

  function onLastPageClick() {
    setPage(totalNumberOfPagesAsIndex());
  }

  function onNextPageClick() {
    setPage(page + 1);
  }

  function onPreviousPageClick() {
    setPage(page - 1);
  }

  function peviousPageButtonsDisabled() {
    return page === 0;
  }

  function totalNumberOfPages() {
    return Math.ceil(items.length / itemsPerPageAsNumber());
  }

  function totalNumberOfPagesAsIndex() {
    return totalNumberOfPages() - 1;
  }

  return (
    <div className="pagination-controls">
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
      <form>
        <PageInput
          max={totalNumberOfPages()}
          onChange={setGoToPage}
          value={goToPage}
        />
      </form>
    </div>
  );
}
