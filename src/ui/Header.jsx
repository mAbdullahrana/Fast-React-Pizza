import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import UserName from "../features/user/UserName.jsx";

function Header() {
  return (
    <header className=" border-b border-stone-200 bg-yellow-400 px-4 py-3 font-semibold uppercase sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
