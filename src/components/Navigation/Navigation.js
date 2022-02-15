import { NavLink } from "react-router-dom";

// const Navigation = () => {
//   const items = [
//     { name: "Home", id:1 , to: "/" },
//     { name: "cart", id: 2 , to: "/cart" },
//   ];

//   return (
//     <header>
//       <nav className="bg-white p-2 w-100">
//         <ul className="flex justify-around items-center">
//           {items.map((item) => {
//             return (
//               <li key={item.id} className="pb-1 hover:text-purple-900">
//                 <NavLink
//                   exact
//                   activeClassName="underline decoration-purple-800 decoration-4"
//                   to={item.to}
//                 >
//                   {item.name}
//                 </NavLink>
//               </li>
//             );
//           })}

//           <li>Amir shopping</li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Navigation;

import { BsCart3 } from "react-icons/bs";
import { ImEnter } from "react-icons/im";
import { useCart } from "../../providers/CartProvider";
import { useAuth } from "../../providers/AuthProvider";


const Navigation = () => {

  const cart = useCart()
  const auth = useAuth()


  return <>
    <header>
      <nav className="bg-white p-4 w-100 flex">


        <ul className="flex  w-5/6 justify-start ">
          <li className="text-purple-500 font-bold mx-2">Amir shopping</li>
          <NavLink activeClassName="underline decoration-purple-800 decoration-4" exact={true} to={"/"}>
            <li className="mx-2">Home</li>
          </NavLink>
        </ul>

        <ul className="flex w-1/6 justify-around">
          {auth ? "profile" : <NavLink to={"/login"}>
            <div className="flex">
              <ImEnter className="font-bold text-purple-500 text-2xl mx-2" />
              <li className="text-purple-500">enter</li>
            </div>
          </NavLink>
          }
          <NavLink className="reletive" to={"/cart"}>
            <li className="font-bold text-purple-500 text-2xl reletive "> <BsCart3 /></li>
            <span className="rounded-full w-5 h-5 flex justify-center items-center bg-red-500 text-white absolute top-2 right-10">{cart.cart.length}</span>
          </NavLink>

        </ul>


      </nav>
    </header>
  </>

}
export default Navigation;