import React from 'react';

const CategoryFilter = ({ selectedCategory, onChange, categories }) => {
  return (
    <select
      value={selectedCategory}
      onChange={onChange}
      className="p-2 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category.name.toLowerCase()}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
