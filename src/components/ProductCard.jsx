import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    const {_id, image_url, product_name, nutrition_grades} = product;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
      <Link to={`/product/${_id}`}>
        {image_url && (
          <img
            src={image_url}
            alt={product_name || "No Image"}
            className="h-48 w-full object-contain mb-4"
          />
        )}
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {product_name || "No Name"}
          </h2>
          {nutrition_grades && (
            <p className="text-yellow-600">
              Nutrition Grade: {nutrition_grades}
            </p>
          )}
        </div>
      </Link>
      <button
        className="mt-2 p-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
