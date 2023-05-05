import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Dasboard, Profile, Settings } from "../Icons/Icons";
import ProfileNav from "../ProfileSidenav/Profile";

const Sidenav = () => {
 return (
  <Dashlinks>
   <main className="dashlinks">
    <ul className="dashlink__ul-list">
     <li className="dashlink__listItem">
      <Link to="/">
      {Dasboard}
      <span className="dashlink__text"> Dashboard</span>
      </Link>
     </li>
     <li className="dashlink__listItem">
      <Link to="/profile">
      {Profile}
      <span className="dashlink__text"> Profile</span>
      </Link>
     </li>
     <li className="dashlink__listItem">
      {Settings}
      <span className="dashlink__text">Settings</span>
     </li>
    </ul>
    <section className="dashlink__profile">
      <ProfileNav />
    </section>
   </main>
  </Dashlinks>
 );
};

//box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);

const Dashlinks = styled.main`
 .dashlinks {
  color: black;
  padding: 2rem;
  border-radius: 0px 0px 30px 30px;
  height: 100vh;
  background: #ffffff;
 }

 a{
   text-decoration: none;
 }
 .dashlink {
  &__ul-list {
   list-style: none;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
  }

  &__text {
    
   font-family: 'Lora', serif; font-size: 2rem;
   color: #d2d2cd;
   position: relative;
   top: -0.8rem;
   margin-left: 0.5rem;
   font-weight: bold;
  }

  &__listItem {
   width: 100%;
   margin: 2.5rem 0;
   transition: all 100ms ease-out;

   &:hover,
   &:active {
    border-right: 4px solid #974444;
    cursor: pointer;

    .dashlink__text {
     color: black;
    }
   }
  }
 }
`;

export default Sidenav;
