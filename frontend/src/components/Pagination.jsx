// src/components/Pagination.jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${page === currentPage 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
