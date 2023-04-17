import React from "react";

const ProductList = ({ className, products, setProducts, addToCart }) => {
  console.log("products" + JSON.stringify(products));
  return (
    <div className={className}>
      <h1>ProductList</h1>

      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.name} {item.price}{" "}
            <button onClick={()=>{addToCart(item)}}>Add to Cart</button>
          </li>
        ))}
      </ul>
      {JSON.stringify(products)}
    </div>
  );
};

export default ProductList;
