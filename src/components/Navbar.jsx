import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router";
import { removeConnections } from "../utils/connectionSlice";
import { removeAllRequests } from "../utils/requestSlice";
import { clearFeed } from "../utils/feedSlice";

const Navbar = () => {
  const data = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMultipleDispatch = () => {
    dispatch(removeAllRequests());
    dispatch(clearFeed());
    dispatch(removeConnections());
    dispatch(removeUser());
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      handleMultipleDispatch();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <header>
      <div className="navbar bg-base-300 fixed top-0 z-[1]">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-lg md:text-2xl">
            👨‍💻 DevTinder
          </Link>
        </div>

        {data && (
          <div className="flex-none gap-2">
            <p className="hidden md:block">
              Welcome, {capitalizeFirstLetter(data.firstName)}
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User photo" src={data.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                 <li>
                  <Link to="/premium">Premium</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
