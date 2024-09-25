import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductList } from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )

}

export default App;
