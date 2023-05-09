interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const maxButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  return (
    <div className="pagination flex flex-col justify-center mt-4 items-center space-y-2">
      <div className="nav-buttons flex justify-center space-x-1">
        <button
          disabled={currentPage === 1}
          onClick={() => handleClick(1)}
          className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          First
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => handleClick(currentPage - 1)}
          className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleClick(currentPage + 1)}
          className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Next
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleClick(totalPages)}
          className="btn btn-primary text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Last
        </button>
      </div>
      <div className="page-buttons flex justify-center space-x-1">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={index}
            className={`btn btn-primary px-4 py-2 rounded-md ${
              currentPage === startPage + index
                ? "bg-blue-700 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            onClick={() => handleClick(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
