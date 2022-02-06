import { NavLink } from "react-router-dom";

const Navigation = () => {
  const items = [
    { name: "Home", id:1 , to: "/" },
    { name: "cart", id: 2 , to: "/cart" },
  ];

  return (
    <header>
      <nav className="bg-white p-2 w-100">
        <ul className="flex justify-around items-center">
          {items.map((item) => {
            return (
              <li key={item.id} className="pb-1 hover:text-purple-900">
                <NavLink
                  exact
                  activeClassName="underline decoration-purple-800 decoration-4"
                  to={item.to}
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}

          <li>Amir shopping</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
