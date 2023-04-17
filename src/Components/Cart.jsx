import React from "react";

const Cart = ({ className, cart, setCart, addToValue, subToValue }) => {
  console.log("cart" + JSON.stringify(cart));

  const changeInCart = (item, value) => {
    const newcart = cart.map((i) => {
      if (i.id !== item.id) {
        // No change
        return i;
      } else {
        // Return updated value
        return {
          ...i,
          quantity: value,
        };
      }
    });
    // Re-render with the new array
    setCart(newcart);
  };

  const subFromValue = (item) => {
    if (item.quantity === 1) {
      // filter to remove the element
      setCart(cart.filter((i) => i.id !== item.id));
    } else {
      const newcart = cart.map((i) => {
        if (i.id !== item.id) {
          // No change
          return i;
        } else {
          // Return updated value
          return {
            ...i,
            quantity: item.quantity - 1,
          };
        }
      });
      setCart(newcart);
      // Re-render with the new array
    }
  };

  return (
    <div className={className}>
      <h1>Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} {item.price}
            <button
              onClick={() => {
                setCart(cart.filter((i) => i.id !== item.id));
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                subFromValue(item);
              }}
            >
              -
            </button>
            <input
              type="text"
              value={item.quantity}
              onChange={(e) => changeInCart(item, e.target.value)}
            />
            <button
              onClick={() => {
                addToValue(item);
              }}
            >
              +
            </button>
          </li>
        ))}
      </ul>
      <button > <a href="/paynow">Buy Now</a>  </button>

      {JSON.stringify(cart)}
    </div>
  );
};

export default Cart;
