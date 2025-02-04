import { useEffect, useState } from "react";
import "../index.css";
import NavBar from "../components/NavBar";
import ProductForm from "../components/ProductForm";
function ProductPage() {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://www.localhost:2002/api/v1/products");
      const data = await response.json();
      console.log(data);
      setProducts(data.data); // Adjust this line based on your API response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <NavBar />
      <ProductForm />
      <h2>Welcome to Product Page</h2>
      <h1>Products</h1>
      <div className="cardc">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <h3>{product.title}</h3>
            <p>{product.company}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
