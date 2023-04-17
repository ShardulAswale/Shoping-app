import React ,{useRef} from "react";
import { useReactToPrint } from "react-to-print";

const PayNow = ({ cart }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getPageMargins = () => {
    return `@page { margin: ${100}px ${200}px ${100}px ${200}px !important;  }`;
  };
  return (
    <>
      <div ref={componentRef} className="page">
      <style>{getPageMargins()}</style>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} {item.price} {item.quantity}
          </li>
        ))}
        {JSON.stringify(cart)}
      </div>
      <button onClick={handlePrint}>Print this out!</button>
    </>
  );
};

export default PayNow;
