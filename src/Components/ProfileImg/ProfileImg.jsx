import React from "react";
import styled from "styled-components";

const ProfileImg = ({width, height, ...rest}) => {
    const imgLink = "https://avatars.githubusercontent.com/u/81338845?v=4";
  return (
    <Image>
      <section className="profile__img" style={{textAlign: 'center'}}>
        {/* <img
          src={imgLink}
          alt="profile image"
          onError={(event) => (event.target.style.display = "none")}
          style={{width: width, height: height}}
          {...rest}
        /> */}
      </section>
    </Image>
  );
};

const Image = styled.section`
  .profile__img {
    margin: 1rem;   

    & img {
      width: 10rem;
      height: 11rem;
      border-radius: 50%;
      margin: 0 auto;
      object-fit: cover;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default ProfileImg;
