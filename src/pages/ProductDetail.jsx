import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`
        );
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-xl py-10">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-xl py-10 text-red-500">
        Product not found!
      </div>
    );
  }

  const handleAddToCart = (product) => {
    
    dispatch(addToCart(product));
    alert(`Added "${product.product_name}" to the cart!`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
        {product.product_name || "Unknown Product"}
      </h1>

      {product.image_url && (
        <div className="flex justify-center mb-6">
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-48 h-48 object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Ingredients</h2>
          <p className="text-gray-600">{product.ingredients_text || "N/A"}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Nutritional Values</h2>
          <ul className="text-gray-600">
            <li className="flex justify-between py-1">
              <span>Energy:</span>
              <span>{product.nutriments?.energy || "N/A"}</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Fat:</span>
              <span>{product.nutriments?.fat || "N/A"}</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Carbohydrates:</span>
              <span>{product.nutriments?.carbohydrates || "N/A"}</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Proteins:</span>
              <span>{product.nutriments?.proteins || "N/A"}</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Labels</h2>
          <p className="text-gray-600">
            {Array.isArray(product.labels)
              ? product.labels.join(", ")
              : product.labels || "N/A"}
          </p>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300" onClick={() => handleAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
