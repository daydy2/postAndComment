import react, { useState } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Feedlane from "./Components/Feedlane/Feedlane";
import ProfilePage from "./Pages/ProfilePage";
import NewPost, { FollowerComp } from "./Components/MakePost/NewPost";
import Toolbar from "./Components/Toolbar/Toolbar";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import Backdrop from "./Components/Backdrop/Backdrop";
import CommentPage from "./Pages/CommentPage";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import useAuthStore from "./store/store";

const App = () => {
 
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  
  console.log("isloggedIn is" + " " + isLoggedIn);

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  return (
    <div className="App">
      <header className="landing">
        <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen} ></SideDrawer>
        {sideDrawerOpen ? <Backdrop click={backdropClickHandler} /> : null}
      </header>

      {isLoggedIn ? (
        <>
          <div className="sidebar">
            <LandingPage />
          </div>

          <div className="main-area">
            <div className="feed-area">
              <Routes>
                <Route path="/feed" element={<Feedlane />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/comment/:postId" element={<CommentPage />} />
              </Routes>
            </div>
            <div className="newpost">
              {/* <Date /> */}
              <NewPost />
              <FollowerComp />
            </div>
          </div>
        </>
      ) : (
        <div className="no-user">
          <Routes>
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
