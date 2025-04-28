import React, { useState, useEffect } from 'react';

const InfinitePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(97);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);
  const ITEMS_PER_PAGE = 10;
  const MAX_PRODUCTS = 10000;
  
  // Calculate total pages based on current known products
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  
  // Simulate fetching more products when needed
  const fetchMoreProducts = async () => {
    if (totalProducts >= MAX_PRODUCTS) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Add more products (between 30-50 more)
    const newProducts = Math.floor(Math.random() * 20) + 30;
    const updatedTotal = Math.min(totalProducts + newProducts, MAX_PRODUCTS);
    
    setTotalProducts(updatedTotal);
    setIsLoading(false);
    
    if (updatedTotal >= MAX_PRODUCTS) {
      setHasReachedLimit(true);
    }
  };
  
  // Check if we need to fetch more when approaching the end
  useEffect(() => {
    if (currentPage > totalPages - 3 && !isLoading && !hasReachedLimit) {
      fetchMoreProducts();
    }
  }, [currentPage, totalPages]);
  
  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
      pages.push(
        <button 
          key={1}
          onClick={() => setCurrentPage(1)}
          className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          1
        </button>
      );
      
      if (start > 2) {
        pages.push(
          <span key="start-ellipsis" className="text-gray-400 flex items-center">
            ...
          </span>
        );
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            currentPage === i 
              ? "bg-green-600 text-white font-medium ring-2 ring-green-500 ring-offset-1 ring-offset-gray-900" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="text-gray-400 flex items-center">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="bg-gray-900 p-8 flex flex-col items-center rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mb-6">
        <span className="text-gray-400 text-sm">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}
          {" "}-{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)}
          {" "}of {isLoading ? "..." : totalProducts} products
        </span>
      </div>
      
      <div className="flex items-center gap-3 relative">
        {isLoading && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            currentPage === 1 
              ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        
        {getPageNumbers()}
        
        <button 
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
              // If we're getting close to the end, fetch more
              if (currentPage >= totalPages - 3 && !hasReachedLimit) {
                fetchMoreProducts();
              }
            }
          }}
          disabled={currentPage === totalPages && hasReachedLimit}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            currentPage === totalPages && hasReachedLimit
              ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      
      {hasReachedLimit && (
        <div className="mt-4 text-xs text-gray-500">
          Reached maximum of {MAX_PRODUCTS} products
        </div>
      )}
    </div>
  );
};

export default InfinitePagination;