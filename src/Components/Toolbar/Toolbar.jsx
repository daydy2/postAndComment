import React from "react";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";
import userSlice from "../../store/store";
import { Request } from "../../api/request";
import { Link, useNavigate } from "react-router-dom";

const Toolbar = (props) => {
  const logout = userSlice((state) => state.logout);
  const isLoggedIn = userSlice((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    Request("get", "logout", null).then((res) => res.data);
    navigate("/login");
  };

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          {isLoggedIn ? (
            <Link to="/profile">Tripple</Link>
          ) : (
            <Link to="/login">Tripple</Link>
          )}
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul className="">
            {isLoggedIn && (
              <li className="">
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {isLoggedIn ? (
              <li className="" onClick={handleClick}>
                <Link to={"/logout"}>Logout</Link>
              </li>
            ) : (
              <li className="" onClick={handleClick}>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="">
                <Link to="/register">Signup</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
