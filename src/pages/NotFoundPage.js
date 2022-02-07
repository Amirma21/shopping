import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-3/4 flex items-center justify-center flex-col">
        <h2 className="text-9xl">404</h2>
        <p className="text-3xl my-4">oops The page you are looking for can not be found ! </p>
        <Link to="/">
          <button className="bg-purple-800 text-white p-2 my-2">Go to home!</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
