import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { HiOutlineShoppingCart } from "react-icons/hi";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortFilter from "../components/SortFilter";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const dispatch = useDispatch();

  const fetchProducts = async (category = "", reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      const url = category
        ? `https://world.openfoodfacts.org/category/${category}.json?page=${
            reset ? 1 : page
          }&page_size=50`
        : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=&json=true&page=${
            reset ? 1 : page
          }&page_size=50`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        const updatedProducts = reset
          ? data.products
          : [...products, ...data.products];
        setProducts(updatedProducts);
        setFilteredProducts(sortProducts(updatedProducts, sortOption));
        setPage((prevPage) => (reset ? 2 : prevPage + 1));
        setHasMore(data.products.length === 50);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://world.openfoodfacts.org/categories.json"
      );
      const data = await response.json();
      if (data.tags && Array.isArray(data.tags)) {
        setCategories(data.tags);
      } else {
        console.error("Invalid categories data format:", data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts("", true);
  }, []);

  const sortProducts = (productsToSort, option) => {
    let sortedProducts = [...productsToSort];

    if (option === "name-asc") {
      sortedProducts.sort((a, b) =>
        (a.product_name || "").localeCompare(b.product_name || "")
      );
    } else if (option === "name-desc") {
      sortedProducts.sort((a, b) =>
        (b.product_name || "").localeCompare(a.product_name || "")
      );
    } else if (option === "grade-asc") {
      sortedProducts.sort((a, b) =>
        (a.nutrition_grades || "").localeCompare(b.nutrition_grades || "")
      );
    } else if (option === "grade-desc") {
      sortedProducts.sort((a, b) =>
        (b.nutrition_grades || "").localeCompare(a.nutrition_grades || "")
      );
    }
    return sortedProducts;
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredProducts(sortProducts(products, sortOption));
    } else {
      const filtered = products.filter((product) => {
        const productName = product.product_name?.toLowerCase() || "";
        const productBarcode = product._id?.toLowerCase() || "";
        return productName.includes(query) || productBarcode.includes(query);
      });
      setFilteredProducts(sortProducts(filtered, sortOption));
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value.toLowerCase();
    setSelectedCategory(selectedValue);
    setPage(1);
    setProducts([]);
    setFilteredProducts([]);
    setHasMore(true);
    fetchProducts(selectedValue, true);
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    setFilteredProducts(sortProducts(filteredProducts, selectedOption));
  };

  const loadMoreProducts = () => {
    fetchProducts(selectedCategory);
  };

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;

  const handleAddToCart = (product) => {
    
    dispatch(addToCart(product));
    alert(`Added "${product.product_name}" to the cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-gray-300 shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Product Explorer</h1>
        <div className="relative">
          <Link to="/cart">
            <HiOutlineShoppingCart className="w-6 h-6 md:w-8 md:h-8 cursor-pointer text-gray-800" />
          </Link>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
      />

  
      <div className="flex flex-col sm:flex-row justify-center gap-2 mb-4">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
          categories={categories}
        />
        <SortFilter
          sortOption={sortOption}
          onChange={handleSortChange}
        />
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-6">
        {filteredProducts.length === 0 && !loading ? (
          <div className="col-span-full text-center text-gray-600">
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        )}
      </div>

  
      {loading && <LoadingSpinner/>}

      
      {hasMore && !loading && (
        <div className="flex justify-center mb-6">
          <button
            onClick={loadMoreProducts}
            className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
