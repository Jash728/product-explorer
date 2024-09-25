import React from 'react';

const SortFilter = ({ sortOption, onChange }) => {
  return (
    <select
      value={sortOption}
      onChange={onChange}
      className="p-2 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
    >
      <option value="default">Sort By</option>
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="grade-asc">Grade (Low-High)</option>
      <option value="grade-desc">Grade (High-Low)</option>
    </select>
  );
};

export default SortFilter;
