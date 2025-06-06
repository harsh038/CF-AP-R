import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center gap-4 ${className}`}>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:text-white hover:bg-black"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        {currentPage > 2 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-400 text-gray-600"
            >
              1
            </button>
            {currentPage > 3 && <span className="text-gray-400">...</span>}
          </>
        )}

        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
          let pageNum;
          if (currentPage === 1) {
            pageNum = i + 1;
          } else if (currentPage === totalPages) {
            pageNum = totalPages - 2 + i;
          } else {
            pageNum = currentPage - 1 + i;
          }

          if (pageNum <= 0 || pageNum > totalPages) return null;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`h-8 w-8 flex items-center justify-center rounded-lg ${
                currentPage === pageNum
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black hover:bg-gray-400"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && (
              <span className="text-gray-600">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-400 text-gray-600 hover:text-black"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:text-white hover:bg-gray-900"
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
