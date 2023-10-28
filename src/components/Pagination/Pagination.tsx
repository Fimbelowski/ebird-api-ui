import { type FormEvent, useState } from 'react';

import { Button } from '../Button/Button';
import { Select, type SelectOptionArray } from '../Select/Select';
import { NumberInput } from '../NumberInput';
import usePaginationBounds from '../../hooks/usePaginationBounds';

interface Props {
  itemsPerPage: number;
  page: number;
  onItemsPerPageChange: (value: number) => void;
  onPageChange: (value: number) => void;
  totalItems: number;
}

export default function Pagination({
  itemsPerPage,
  onItemsPerPageChange: onItemsPerPageChangeProp,
  onPageChange,
  page,
  totalItems,
}: Props) {
  const { lowerBound, upperBound } = usePaginationBounds(
    page,
    itemsPerPage,
    totalItems
  );

  const [goToPage, setGoToPage] = useState('');

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

  function firstAndPreviousPageButtonsDisabled() {
    return page === 1;
  }

  function nextAndLastPageButtonsDisabled() {
    return page === totalNumberOfPages();
  }

  function onItemsPerPageChange(value: string) {
    onItemsPerPageChangeProp(parseInt(value, 10));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    onPageChange(parseInt(goToPage, 10));
    setGoToPage('');
  }

  function pageInputPlaceholder() {
    return Math.max(Math.floor(totalNumberOfPages() / 2), 1).toLocaleString();
  }

  function paginationInfo() {
    const lowerBoundString = (lowerBound + 1).toLocaleString();
    const upperBoundString = upperBound.toLocaleString();

    return `Showing ${lowerBoundString} - ${upperBoundString} of ${totalItems.toLocaleString()}`;
  }

  function totalNumberOfPages() {
    return Math.ceil(totalItems / itemsPerPage);
  }

  return (
    <div className="pagination">
      <div className="pagination__info">{paginationInfo()}</div>
      <div className="pagination__controls">
        <Button
          disabled={firstAndPreviousPageButtonsDisabled()}
          onClick={() => {
            onPageChange(1);
          }}
          type="button"
        >
          First
        </Button>
        <Button
          disabled={firstAndPreviousPageButtonsDisabled()}
          onClick={() => {
            onPageChange(page - 1);
          }}
          type="button"
        >
          Previous
        </Button>
        <Button
          disabled={nextAndLastPageButtonsDisabled()}
          onClick={() => {
            onPageChange(page + 1);
          }}
          type="button"
        >
          Next
        </Button>
        <Button
          disabled={nextAndLastPageButtonsDisabled()}
          onClick={() => {
            onPageChange(totalNumberOfPages());
          }}
          type="button"
        >
          Last
        </Button>
        <Select
          id="items-per-page"
          inline
          label="Items Per Page"
          onChange={onItemsPerPageChange}
          options={itemsPerPageOptions}
          value={itemsPerPage.toString()}
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
            max={totalNumberOfPages().toString()}
            min="1"
            noScroll
            onChange={setGoToPage}
            placeholder={pageInputPlaceholder()}
            required
            size={3}
            value={goToPage}
          />
          <Button type="submit">Go</Button>
        </form>
      </div>
    </div>
  );
}
