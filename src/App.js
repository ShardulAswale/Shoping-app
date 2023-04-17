import "./App.css";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import PayNow from "./Components/PayNow";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";

function App() {
  const init_products = [
    { id: 1, name: "Product A", price: 1000 },
    { id: 2, name: "Product B", price: 2000 },
    { id: 3, name: "Product C", price: 3000 },
  ]

  let init_cart;
  if (localStorage.getItem("cart") === null) {
    init_cart = [];
  } else {
    init_cart = JSON.parse(localStorage.getItem("cart"));
  } 
  const [products, setProducts] = useState(init_products);
  const [cart, setCart] = useState(init_cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (element) => {
    console.log("adding " + JSON.stringify(element) + element.id);
    if (cart.filter((item) => item.id === element.id).length === 0) {
      setCart([...cart, { ...element, quantity: 1 }]);
      
    } else {
      console.log("already exists");
      addToValue(element);
    }
    console.log(cart.filter((item) => item.id === element.id));
  };
  const addToValue = (element) => {
    console.log("adding to value");
    const newcart = cart.map((i) => {
      if (i.id === element.id) {
        console.log(i + i.quantity);
        return { ...i, quantity: i.quantity + 1 };
      } else {
        return i;
      }
    });
    setCart(newcart);
  };
  const subToValue = (element) => {
    console.log("substracting from value");
    cart.map((i) => {
      if (i.id === element.id) {
        console.log(i + i.quantity);
        setCart([
          ...cart.filter((i) => i.id !== element.id),
          { ...i, quantity: i.quantity - 1 },
        ]);
      } else {
        if (i.quantity === 0) {
          console.log(
            "filter" + JSON.stringify(cart.filter((i) => i.id !== element.id))
          );
          setCart(cart.filter((i) => i.id !== element.id));
        }
      }
      return null;
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="body">
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <>
                  <ProductList
                    className="list"
                    products={products}
                    setProducts={setProducts}
                    addToCart={addToCart}
                  />
                  <Cart
                    className="cart"
                    cart={cart}
                    setCart={setCart}
                    addToValue={addToValue}
                    subToValue={subToValue}
                  />
                </>
              }
            />
            <Route path="/paynow" element={<PayNow cart={cart} />} />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
