import react, { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import Feedlane from "./Components/Feedlane/Feedlane";
import ProfilePage from "./Pages/ProfilePage";
import NewPost from "./Components/MakePost/NewPost";
import Toolbar from "./Components/Toolbar/Toolbar";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import Backdrop from "./Components/Backdrop/Backdrop";
import CommentPage from "./Pages/CommentPage";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import userSlice from "./store/store";
import EditPage from "./Pages/EditPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { createGlobalStyle } from "styled-components";

// const GlobalStyle = createGlobalStyle`
// @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&display=swap');
// `;
{
  /* <GlobalStyle /> */
}

const App = () => {
  const isLoggedIn = userSlice((state) => state.isLoggedIn);

  console.log("isloggedIn is" + " " + isLoggedIn);
  const navigate = useNavigate();
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <header className="landing">
        <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen}></SideDrawer>
        {sideDrawerOpen ? <Backdrop click={backdropClickHandler} /> : null}
      </header>
      <ToastContainer />

      {isLoggedIn ? (
        <>
          <div className="sidebar">
            <LandingPage />
          </div>

          <div className="main-area">
            <div className="feed-area">
              <Routes>
                <Route path="/" element={<Feedlane />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/comment/:postId" element={<CommentPage />} />
                <Route path="/edit/:postId" element={<EditPage />} />
              </Routes>
            </div>
            <div className="newpost">
              {/* <Date /> */}
              <NewPost />
              {/* <FollowerComp /> */}
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
