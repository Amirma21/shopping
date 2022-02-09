import Navigation from "../components/Navigation/Navigation";

const Layout = ({ childern }) => {
  return (
    <div>
      <Navigation />
    <div>{childern}</div>
    <div>Hello</div>
    </div>
  );
};

export default Layout;
