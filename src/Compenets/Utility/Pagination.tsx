import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstLast?: boolean;
  showPageInfo?: boolean;
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const DOTS = "…" as const;

const usePagination = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number
) => {

  const totalPageNumbers = boundaryCount * 2 + siblingCount * 2 + 3;
  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount);

  const showLeftDots = leftSiblingIndex > boundaryCount + 1;
  const showRightDots = rightSiblingIndex < totalPages - boundaryCount;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;


  if (!showLeftDots && showRightDots) {
    const leftItemCount = 2 + siblingCount * 2;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 2 + siblingCount * 2;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (showLeftDots && showRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return range(1, totalPages);
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstLast = true,
  showPageInfo = false,
}: PaginationProps) => {
  const items = usePagination(currentPage, totalPages, siblingCount, boundaryCount);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const handleKey = (e: React.KeyboardEvent<HTMLButtonElement>, page: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPageChange(page);
    }
  };

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 w-full"
      aria-label="Pagination"
    >
      {showPageInfo && (
        <div className="text-sm text-gray-600 text-center sm:text-left">
          Page <span className="font-medium text-gray-800">{currentPage}</span> of {totalPages}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 mx-auto">

        {showFirstLast && (
          <button
            type="button"
            aria-label="First page"
            className={`px-3 py-2 h-10 min-w-10 rounded-xl border text-sm transition-all duration-200 hidden sm:flex items-center justify-center ${
              isFirst
                ? "cursor-not-allowed opacity-504border-gray-300 text-gray-400"
                : "border-[#3B8D90] text-[#3B8D90] hover:bg-[#3B8D90] hover:text-white"
            }`}
            onClick={() => !isFirst && onPageChange(1)}
            onKeyDown={(e) => !isFirst && handleKey(e, 1)}
            disabled={isFirst}
          >
            «
          </button>
        )}

        <button
          type="button"
          aria-label="Previous page"
          className={`px-3 py-2 h-10 min-w-10 rounded-xl border text-sm transition-all duration-200 flex items-center justify-center ${
            isFirst
              ? "cursor-not-allowed opacity-504border-gray-300 text-gray-400"
              : "border-[#3B8D90] text-[#3B8D90] hover:bg-[#3B8D90] hover:text-white"
          }`}
          onClick={() => !isFirst && onPageChange(currentPage - 1)}
          onKeyDown={(e) => !isFirst && handleKey(e, currentPage - 1)}
          disabled={isFirst}
        >
          <FiChevronLeft size={16} />
        </button>

        {items.map((item, idx) => {
          if (item === DOTS) {
            return (
              <span
                key={`dots-${idx}`}
                className="px-2 text-gray-600 font-semibold text-lg select-none flex items-center"
              >
                …
              </span>
            );
          }
          const page = item as number;
          const active = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              aria-current={active ? "page" : undefined}
              className={`px-3 py-2 h-10 min-w-10 rounded-xl border text-sm transition-all duration-200 ${
                active
                  ? "bg-[#3B8D90] text-white border-[#3B8D90]"
                  : "border-gray-400 text-gray-700 hover:bg-[#3B8D90] hover:text-white hover:border-[#3B8D90]"
              }`}
              onClick={() => onPageChange(page)}
              onKeyDown={(e) => handleKey(e, page)}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Next page"
          className={`px-3 py-2 h-10 min-w-10 rounded-xl border text-sm transition-all duration-200 flex items-center justify-center ${
            isLast
              ? "cursor-not-allowed opacity-504border-gray-300 text-gray-400"
              : "border-[#3B8D90] text-[#3B8D90] hover:bg-[#3B8D90] hover:text-white"
          }`}
          onClick={() => !isLast && onPageChange(currentPage + 1)}
          onKeyDown={(e) => !isLast && handleKey(e, currentPage + 1)}
          disabled={isLast}
        >
          <FiChevronRight size={16} />
        </button>

        {showFirstLast && (
          <button
            type="button"
            aria-label="Last page"
            className={`px-3 py-2 h-10 min-w-10 rounded-xl border text-sm transition-all duration-200 hidden sm:flex items-center justify-center ${
              isLast
                ? "cursor-not-allowed opacity-504border-gray-300 text-gray-400"
                : "border-[#3B8D90] text-[#3B8D90] hover:bg-[#3B8D90] hover:text-white"
            }`}
            onClick={() => !isLast && onPageChange(totalPages)}
            onKeyDown={(e) => !isLast && handleKey(e, totalPages)}
            disabled={isLast}
          >
            »
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
