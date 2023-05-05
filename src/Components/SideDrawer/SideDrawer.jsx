import React from "react";
import { Link } from "react-router-dom";
import userSlice from "../../store/store";
import "./SideDrawer.css";
import { Request } from "../../api/request";

const sideDrawer = (props) => {
  const logout = userSlice((state) => state.logout);
  const isLoggedIn = userSlice((state) => state.isLoggedIn);
  let drawerClass = " side-drawer";
  if (props.show) {
    drawerClass = "side-drawer open";
  }
  const handleClick = () => {
    logout();
    Request("get", "logout", null).then((res) => res.data);
    navigate("/login");
  };

  return (
    <nav className={drawerClass}>
      <ul>
        <li>
          <span className="span__tripple">TrippleDev</span>
        </li>

        {isLoggedIn && (
          <li>
            <Link to={"/"}>
              <span className="sideDrawerAnc">Dashboard</span>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/profile">
              <span className="sideDrawerAnc">Profile</span>
            </Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <Link to="/logout">
              <span className="sideDrawerAnc">Logout</span>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <span className="sideDrawerAnc" onClick={handleClick}>Login</span>
            </Link>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/register">
              <span className="sideDrawerAnc">Sign up</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default sideDrawer;
