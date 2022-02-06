import Layout from "../Layout/Layout";
import { useCart, useCartAction } from "../providers/CartProvider";
import { BsTrash } from "react-icons/bs";
import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, total } = useCart();
  const dispach = useCartAction();

  const addBtnHandler = (product) => {
    dispach({ type: "ADD_TO_CART", payLoad: product });
  };

  const decrementHandler = (product) => {
    dispach({ type: "decrement", payLoad: product });
  };

  if (!cart.length) {
    return (
      <>
        <Layout />
        <p>your cart is empty ... </p>
      </>
    );
  } else {
    return (
      <>
        <Layout />
        <div className="flex flex-wrap justify-center mt-2">
          <div className="w-full sm:w-3/5">
            {cart.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white mb-2 px-3"
                >
                  <div className="w-32 h-28">
                    <img
                      className="w-full h-full"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <p>{item.name}</p>
                  <div>
                    <p>$ {item.offPrice * item.quantity}</p>
                  </div>
                  <div className="flex items-center border border-purple-800 rounded px-2">
                    <button
                      onClick={() => decrementHandler(item)}
                      className=" text-xl  p-1"
                    >
                      {item.quantity > 1 ? (
                        "-"
                      ) : (
                        <BsTrash className="text-red-700" />
                      )}
                    </button>
                    <span className="border border-x-purple-800 px-2 mx-3 h-full py-2 flex justify-center items-centner ">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addBtnHandler(item)}
                      className=" rounded text-xl p-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sm:w-3/12 h-auto bg-white ml-5 w-3/5 px-2">
            <SummeryCart total={total} />
          </div>
        </div>
      </>
    );
  }
};

export default Cart;

const SummeryCart = ({ total }) => {
  const { cart } = useCart();

  const orginalPrice = cart.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.quantity;
  }, 0);

  return (
    <>
      <h2 className="mb-4 font-bold text-lg">cart summety</h2>

      <div className="flex justify-between mt-1 mb-1 ">
        <p>cart total</p>
        <span>{orginalPrice} $ </span>
      </div>
      <div className="flex justify-between mb-3 mt-1 ">
        <p>cart discount</p>
        <span>{orginalPrice - total} $ </span>
      </div>

      <hr />

      <div className="flex justify-between ">
        <p>net price</p>
        <span className="font-bold">{total} $ </span>
      </div>
      <Link to="/checkout">
        <button className="bg-purple-800 text-white w-full mt-6 p-1 rounded">
          go to checkout
        </button>
      </Link>
    </>
  );
};
