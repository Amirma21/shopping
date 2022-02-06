import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import CartProvider from "./providers/CartProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from "./pages/CheckOutPage";




export default function App() {
  return (
    <>
    <ToastContainer />
      <CartProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/cart" exact={true} component={Cart} />
            <Route path="/checkout"  exact={true} component={CheckOut} />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}
