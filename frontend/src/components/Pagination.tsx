
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const getPageNumbers = (): number[] => {
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(
            totalPages,
            startPage + maxVisiblePages - 1
        );
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
        const pages: number[] = [];
        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }

        return pages;
    };

    const buttonStyle =
        "rounded-lg px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";

    return (
        <nav
            aria-label="Movie results pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`${buttonStyle} bg-white/5 text-gray-300 hover:bg-white/10`}
            >
                Previous
            </button>

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    type="button"
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => onPageChange(page)}
                    className={`${buttonStyle} ${currentPage === page
                            ? "bg-red-600 font-semibold text-white"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`${buttonStyle} bg-white/5 text-gray-300 hover:bg-white/10`}
            >
                Next
            </button>
        </nav>
    );
}
