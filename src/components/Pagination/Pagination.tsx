import { type FormEvent, useEffect, useState } from 'react';

import Button from '../Button/Button';
import { Select, type SelectOptionArray } from '../Select/Select';
import { NumberInput } from '../NumberInput';

interface Props<T> {
  items: T[];
  onPaginatedItemsChange: (newlyPaginatedItems: T[]) => void;
}

export default function PaginationControls<T>({
  items,
  onPaginatedItemsChange,
}: Props<T>) {
  const [goToPage, setGoToPage] = useState('');
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

  function firstAndPreviousPageButtonsDisabled() {
    return page === 1;
  }

  function itemsPerPageAsNumber() {
    return parseInt(itemsPerPage, 10);
  }

  function getPaginatedItems() {
    return items.slice(paginatedItemsLowerBound(), paginatedItemsUpperBound());
  }

  function nextAndLastPageButtonsDisabled() {
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

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setPage(parseInt(goToPage, 10));
    setGoToPage('');
  }

  function pageInputPlaceholder() {
    return Math.floor(totalNumberOfPages() / 2).toLocaleString();
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

  function totalNumberOfPages() {
    return Math.ceil(items.length / itemsPerPageAsNumber());
  }

  return (
    <div className="pagination">
      <div className="pagination__info">{paginationInfo()}</div>
      <div className="pagination__controls">
        <Button
          disabled={firstAndPreviousPageButtonsDisabled()}
          onClick={onFirstPageClick}
          type="button"
        >
          First
        </Button>
        <Button
          disabled={firstAndPreviousPageButtonsDisabled()}
          onClick={onPreviousPageClick}
          type="button"
        >
          Previous
        </Button>
        <Button
          disabled={nextAndLastPageButtonsDisabled()}
          onClick={onNextPageClick}
          type="button"
        >
          Next
        </Button>
        <Button
          disabled={nextAndLastPageButtonsDisabled()}
          onClick={onLastPageClick}
          type="button"
        >
          Last
        </Button>
        <Select
          id="items-per-page"
          inline
          label="Items Per Page"
          onChange={setItemsPerPage}
          options={itemsPerPageOptions}
          value={itemsPerPage}
        />
        <form
          className="pagination__go-to-page-form"
          onSubmit={onSubmit}
        >
          <NumberInput
            hideRequiredAsterisk
            hideStepper
            id="go-to-page"
            inline
            label="Go to Page"
            max={totalNumberOfPages()}
            min={1}
            noScroll
            onChange={setGoToPage}
            placeholder={pageInputPlaceholder()}
            required
            value={goToPage}
          />
          <Button type="submit">Go</Button>
        </form>
      </div>
    </div>
  );
}
