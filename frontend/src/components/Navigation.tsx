import { Link } from "react-router-dom";
import { Home, Compass, User, LogOut } from "lucide-react";

function Navigation() {
  const mockUser = {
    id: "1",
    email: "asura@abv.bg",
    username: "Asura",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    status: "Feeling strong rn",
  };
  return (
    <>
      <header className="hidden md:block h-screen w-[15rem] lg:w-[18rem] bg-slate-900 border-r border-slate-800 text-[20px]">
        <nav>
          <div className="flex flex-row justify-between p-2 border-b border-slate-700 mb-2">
            <div className="w-[30%]">
              <img src={mockUser.img} className="w-full rounded-full" />
            </div>
            <div className="flex justify-around pl-2 flex-col text-sm w-[70%]">
              <p className="truncate">{mockUser.username}</p>
              <p className="text-xs truncate text-gray-400">
                {mockUser.status}
              </p>
            </div>
          </div>
          <ul className="flex flex-col pl-3 text-lg items-start h-40 justify-between mt-4">
            <li>
              <Link
                to="/"
                className="flex flex-row hover:scale-105 duration-300"
              >
                <Home className="w-6 h-6 text-white mr-1" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="flex flex-row hover:scale-105 duration-300"
              >
                <Compass className="w-6 h-6 text-white mr-1" />
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/user"
                className="flex flex-row hover:scale-105 duration-300"
              >
                <User className="w-6 h-6 text-white mr-1" />
                Account
              </Link>
            </li>
            <li>
              <button className="cursor-pointer flex flex-row hover:scale-105 duration-300">
                <LogOut className="w-6 h-6 text-white mr-1" />
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <header className="block md:hidden w-full bg-slate-900 bottom-0 fixed">
        <nav>
          <ul className="py-2 w-[80%] m-auto flex flex-row justify-between items-center">
            <li>
              <Link to="/">
                <Home className="w-6 h-6 text-white" />
              </Link>
            </li>
            <li>
              <Link to="/explore">
                <Compass className="w-6 h-6 text-white" />
              </Link>
            </li>
            <li>
              <Link to="/user">
                <User className="w-6 h-6 text-white" />
              </Link>
            </li>
            <li>
              <button className="cursor-pointer">
                <LogOut className="w-6 h-6 text-white" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navigation;
