const Pagination = ({
    totalPages,
    currentPage,
    paginate,
  }) => {
    // Function to generate an array of page numbers
    const getPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
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
      </ul>
    );
  };
  
  export default Pagination;
  