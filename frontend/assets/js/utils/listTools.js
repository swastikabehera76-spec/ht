// frontend/assets/js/utils/listTools.js

/**
 * Filter a list of objects by searching multiple fields
 * @param {Array} list - Array of objects to filter
 * @param {string} searchTerm - Search term (case-insensitive)
 * @param {Array} searchFields - Array of field names to search in
 * @returns {Array} Filtered array
 */
export function filterList(list, searchTerm, searchFields) {
  if (!searchTerm || searchTerm.trim() === '') {
    return list;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return list.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(term);
    });
  });
}

/**
 * Sort a list of objects by a specific field
 * @param {Array} list - Array of objects to sort
 * @param {string} sortKey - Field name to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted array (new array, does not mutate original)
 */
export function sortList(list, sortKey, direction = 'asc') {
  const sorted = [...list]; // Create a copy to avoid mutating original
  
  sorted.sort((a, b) => {
    let valueA = a[sortKey];
    let valueB = b[sortKey];
    
    // Handle null/undefined
    if (valueA === null || valueA === undefined) valueA = '';
    if (valueB === null || valueB === undefined) valueB = '';
    
    // Try to parse as numbers for numeric sorting
    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);
    
    // If both are valid numbers, sort numerically
    if (!isNaN(numA) && !isNaN(numB)) {
      return direction === 'asc' ? numA - numB : numB - numA;
    }
    
    // Otherwise sort as strings
    const strA = String(valueA).toLowerCase();
    const strB = String(valueB).toLowerCase();
    
    if (direction === 'asc') {
      return strA < strB ? -1 : strA > strB ? 1 : 0;
    } else {
      return strA > strB ? -1 : strA < strB ? 1 : 0;
    }
  });
  
  return sorted;
}

/**
 * Paginate a list
 * @param {Array} list - Array to paginate
 * @param {number} page - Page number (1-based)
 * @param {number} pageSize - Items per page
 * @returns {Object} { items, totalPages, currentPage, totalItems }
 */
export function paginateList(list, page = 1, pageSize = 10) {
  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = list.slice(startIndex, endIndex);
  
  return {
    items,
    totalPages,
    currentPage,
    totalItems,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
}