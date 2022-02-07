import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import CartProvider from "./providers/CartProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from "./pages/CheckOutPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";




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
            <Route path="/login"  exact={true} component={LoginPage} />
            <Route path="/signup"  exact={true} component={SignupPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}
