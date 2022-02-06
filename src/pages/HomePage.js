import Layout from "../Layout/Layout";
import { products } from "../data";
import "./homePage.css";
import { useCart, useCartAction } from "../providers/CartProvider";
import { toast } from "react-toastify";

const HomePage = () => {
  const dispach = useCartAction();
 const {cart , total} =  useCart()
 

  const addProductHandler = (product) => {
    dispach({ type: "ADD_TO_CART", payLoad: product });
    toast.success("added in cart !")
  };


  const checkInCart = (prodcut)=>{
    return cart.find((item)=>item.id === prodcut.id)
  }

  return (
    <>
      <Layout />
      <main className="flex justify-center mt-3">
        <section className="products">
          {products.map((product) => {
            return (
              <div key={product.id} className="bg-gray-50">
                <div className="prodcutImgage">
                  <img src={product.image} alt="" />
                </div>
                <div className="p-2 flex justify-between">
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <button
                    className="bg-purple-800 text-white px-1 rounded"
                    onClick={() => addProductHandler(product)}
                  >
                   {checkInCart(product) ? "in cart" :  "add in cart " } 
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default HomePage;

