import React, { FC } from "react";

interface PaginationProps {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

function leastTensNumber(num: number) {
  let reminder = num % 10;
  return num - reminder === 0 ? 1 : num - reminder;
}

function greatestTensNumber(num: number) {
  let reminder = num % 10;
  return num + 10 - reminder;
}

const Pagination: FC<PaginationProps> = ({ total, current, onPageChange }) => {
  const showFirstLastButtons = total > 3;
  const firstPage = leastTensNumber(current);
  const lastPage =
    greatestTensNumber(current) <= total ? greatestTensNumber(current) : total;

  const pageButtons = [];

  for (let i = firstPage; i <= lastPage; i++) {
    const isCurrentPage = i === current;
    pageButtons.push(
      <button
        key={i}
        className={`mx-[0.4px] py-1 px-2 rounded-full ${
          isCurrentPage ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={() => {
          onPageChange(i);
        }}
        disabled={isCurrentPage}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center text-white max-sm:max-w-[20rem] flex-wrap items-center my-4">
      {showFirstLastButtons && (
        <button
          className="bg-white text-black mx-1 py-1 px-2 rounded-full"
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
        >
          &lt;
        </button>
      )}

      {firstPage > 9 && (
        <>
          <button
            className={`mx-1 py-1 px-2 rounded-full ${
              current === 1 ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              onPageChange(1);
            }}
            disabled={current === 1}
          >
            {1}
          </button>
          <span className="mx-1">..</span>
        </>
      )}

      {pageButtons}

      {total > 10 && lastPage !== total && (
        <>
          <span className="mx-1">..</span>
          <button
            className={` mx-1 py-1 px-2 rounded-full ${
              current === total - 1
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              onPageChange(total - 1);
            }}
            disabled={current === total - 1}
          >
            {total - 1}
          </button>
          <button
            className={`mx-1 py-1 px-2 rounded-full ${
              current === total ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              onPageChange(total);
            }}
            disabled={current === total}
          >
            {total}
          </button>
        </>
      )}

      {showFirstLastButtons && (
        <button
          className="bg-white text-black mx-1 py-1 px-2 rounded-full"
          onClick={() => onPageChange(current + 1)}
          disabled={current === total}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
