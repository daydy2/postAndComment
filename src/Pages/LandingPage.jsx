import { useState } from "react";

import styled from "styled-components";

import Sidenav from "../Components/Sidenav/Sidenav";
import Profile from "../Pages/ProfilePage";
// import Feedlane from "../Components/Feedlane/Feedlane";

const LandingPage = (props) => {
  const [openComment, setOpenComment] = useState(false);
  // const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  // const drawerToggleClickHandler = () => {
  //   setSideDrawerOpen(!sideDrawerOpen);
  // };

  // const backdropClickHandler = () => {
  //   setSideDrawerOpen(false);
  //   setOpenComment(false);
  // };

  const openCommentHandler = () => {
    setOpenComment(!openComment);
  };

  return (
    <Home>
      <main className="landingPage__main">
        <section className="landingpage__sidenav">
          <Sidenav />
        </section>
      </main>
    </Home>
  );
};

const Home = styled.main`
  .landingPage__main {
    color: black;
    margin-top: 2rem;
    padding-top: 3rem;
    padding-right: 0rem;
    display: flex;
    flex-direction: row;
  }

  .landing__comment {
    position: fixed;
  }
  .landing__feedlane {
    margin-left: 30rem;
  }
  @media screen and (max-width: 768px){
  .landingPage__main {
    display: none
  }
  .landing__feedlane {
    margin-left: 4rem;
  }
  }
`;

export default LandingPage;
