import React from "react";
import styled from "styled-components";

const Typography = (props) => {
  return (
    <Typo>
      <section className="profile__details">
        <span className="profile__name name">{props.handle}</span>
        <span className="profile__name email">{props.email}</span>
      </section>
    </Typo>
  );
};

const Typo = styled.section`
  .profile__details {
    margin-top: 0;

    & .profile__name {
      display: block;
      text-align: center;
    }
  }
  .name {
    font-family: "Lora", serif;
    font-size: 1.5rem;
    font-weight: bolder;
  }
  .email {
    font-family: "Lora", serif;
    font-size: 1rem;
    margin-top: 1rem;
  }
`;

export default Typography;
