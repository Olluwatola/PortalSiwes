import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Pagination = ({
  totalPages,
  currentPage,
  paginate,
}) => {
  // Function to generate an array of page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startingPage = Math.max(1, currentPage - 1); // Ensure starting page is not less than 1
    if (currentPage >= totalPages - 2) {
      startingPage = Math.max(1, totalPages - 2);
    }
    for (let i = startingPage; i <= Math.min(startingPage + 2, totalPages); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <ul className="flex mt-8 text-neutral-600">
      {totalPages > 3 && currentPage > 2 && (
        <>
          <li className="mx-1">
            <button className="w-8 h-8 transition-all duration-200 ease-in-out rounded-md flex justify-center items-center hover:bg-primary hover:text-white" onClick={() => paginate(1)}>
              <FiChevronsLeft />
            </button>
          </li>
          <li className="mx-1">
            <button className="w-8 h-8 transition-all duration-200 ease-in-out rounded-md flex justify-center items-center hover:bg-primary hover:text-white" onClick={() => paginate(Math.max(1, currentPage - 1))}>
              <FiChevronLeft />
            </button>
          </li>
        </>
      )}
      {getPageNumbers().map((page) => (
        <li key={page} className="mx-1">
          <button
            onClick={() => paginate(page)}
            className={`h-8 w-8 flex justify-center items-center rounded-md hover:bg-primary hover:text-white ${
              currentPage === page ? "bg-primary text-white" : ""
            } transition-all duration-200 ease-in-out`}
          >
            {page}
          </button>
        </li>
      ))}
      {totalPages > 3 && currentPage < totalPages - 1 && (
        <>
          <li className="mx-1">
            
            <button className="w-8 h-8 transition-all duration-200 ease-in-out rounded-md flex justify-center items-center hover:bg-primary hover:text-white" onClick={() => paginate(currentPage + 1)}>
              <FiChevronRight />
            </button>
          </li>
          <li className="mx-1">
            <button className="w-8 h-8 transition-all duration-200 ease-in-out rounded-md flex justify-center items-center hover:bg-primary hover:text-white" onClick={() => paginate(totalPages)}>
              <FiChevronsRight />
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default Pagination;
