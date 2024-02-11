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
      <ul className="flex mt-8">
        {getPageNumbers().map((page) => (
          <li key={page} className="mx-1">
            <button
              onClick={() => paginate(page)}
              className={`h-8 w-8 flex justify-center items-center rounded-md ${
                currentPage === page ? "bg-primary text-white" : "bg-neutral-200"
              } transition-all duration-200 ease-in-out`}
            >
              {page}
            </button>
          </li>
        ))}
        {totalPages > 3  && (
          <>
            <li className="mx-1">
              <button onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
            <li className="mx-1">
              <button onClick={() => paginate(totalPages)}>Last</button>
            </li>
          </>
        )}
      </ul>
    );
  };
  
  export default Pagination;
  