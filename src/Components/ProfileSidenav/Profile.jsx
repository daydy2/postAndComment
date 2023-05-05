import React from "react";
import styled from "styled-components";
import { Logout } from "../Icons/Icons";
import ProfileImg from "../ProfileImg/ProfileImg";
import Typography from "../ProfileTypography/Typography";
import { Request } from "../../api/request";
import userSlice from "../../store/store";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const logout = userSlice((state) => state.logout);
  // const token = userSlice((state) => state.token);
  const navigate = useNavigate();
  const user = userSlice((state) => state.user);
  console.log("data for user from profile sidnav " + " " + user);

  const handleClick = () => {
    logout();
    Request("get", "logout", null).then((res) => res.data);
    navigate("/login");
  };
  return (
    <ProfileSideNav>
      <main className="profile">
        <ProfileImg width="6rem" height="6rem" />
        <Typography handle={user?.user.handle} email={user?.user.email} />
        <section className="profile__logout">
          <div className="logout" onClick={handleClick}>
            {Logout}
          </div>
        </section>
      </main>
    </ProfileSideNav>
  );
};

const ProfileSideNav = styled.main`
  .profile {
    color: black;
    width: 100%;
    padding: 1rem 0;
    border-radius: 30px 30px 0px 0px;
    height: 50vh;
    display: flex;
    flex-direction: column !important;
    justify-content: flex-start;

    &__logout {
      text-align: center;
      padding-top: 2rem;
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;

      .logout {
        width: 5rem;
        height: 5rem;
        padding: 1rem;
        border-radius: 50%;
        background-color: #f1f1ef;
        text-align: center;
        transition: all 0.3s ease-in-out;

        &:hover {
          outline: #4caf50 solid 10px;
          cursor: pointer;
        }
      }
    }
  }
`;

export default Profile;
