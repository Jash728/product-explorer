import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex justify-center py-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search for products..."
        className="p-2 w-full sm:w-1/2 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
};

export default SearchBar;
