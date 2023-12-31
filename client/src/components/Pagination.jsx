import { paginationAtom } from "../state";
import { useAtom } from "jotai";

function Pagination() {
  const [pagination, setPagination] = useAtom(paginationAtom);
  let tempHist;
  const handlePreviousPage = () => {
    tempHist = pagination.history ? [...pagination.history] : [];
    const prevPage = tempHist.pop();
    prevPage.lastKeyData =
      tempHist.length !== 0 ? tempHist[tempHist.length - 1].lastKeyData : null;
    setPagination({
      ...prevPage,
      history: tempHist,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    console.log("pagination", pagination);
  };

  const handleNextPage = () => {
    tempHist = pagination.history ? [...pagination.history] : [];
    tempHist.push({
      pageNumber: pagination.pageNumber,
      lastKeyData: pagination.lastKeyData,
    });
    setPagination({
      pageNumber: pagination.pageNumber + 1,
      lastKeyData: pagination.lastKeyData,
      history: tempHist,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    console.log("pagination", pagination);
  };

  return (
    <nav aria-label="Page navigation example" data-testid="pagination">
      <ul className="list-style-none flex justify-center my-3">
        <li>
          {pagination.pageNumber === 1 ? (
            <div></div>
          ) : (
            <button
              className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={handlePreviousPage}
            >
              Previous
            </button>
          )}
        </li>
        <li>
          <button className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
            {pagination && pagination.pageNumber}
          </button>
        </li>
        {!pagination.lastKeyData ? (
          <div></div>
        ) : (
          <li>
            <button
              className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={handleNextPage}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
