import { paginationAtom } from "../state";
import { useAtom } from "jotai";

function Pagination() {
  const [pagination, setPagination] = useAtom(paginationAtom);
  const handleNextPage = () => {
    setPagination({
      pageNumber: pagination.pageNumber + 1,
      lastKeyData: pagination.lastKeyData,
    });
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none flex justify-center my-3">
        <li>
          {pagination.pageNumber === 1 ? (
            <div></div>
          ) : (
            <button className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
              Previous
            </button>
          )}
        </li>
        <li>
          <button className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
            {pagination && pagination.pageNumber}
          </button>
        </li>
        <li>
          <button
            className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            onClick={handleNextPage}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
