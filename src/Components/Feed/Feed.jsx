import React, { useState } from "react";
import styled from "styled-components";
import { Comment, Follow, UnFollow } from "../Icons/Icons";
import Modal from "../Modal";
import ProfileImg from "../ProfileImg/ProfileImg";
import Typography from "../ProfileTypography/Typography";

const Feed = ({ title, post, author, postId }) => {
  const [showComment, setShowComment] = useState(false);
  const handleComment = () => {
    setShowComment(!showComment);
  };
  return (
    <FEED>
      <main>
        <section className="feedUser">
          <ProfileImg width={"50px"} height={"50px"} />
          <Typography profileName={"Dinis Danielle"} fzname={"13px"} />
        </section>
        <section className="feedPost">
          <p className="feedPost__title"> {title} </p>
          <p className="feedPost__post">{post}</p>
          {/* <p style={{ textAlign: "right", fontSize: "18px" }}>
            <em>{author}</em>
          </p> */}
          <div className="feedConnect">
            <span className="feedConnect__span" onClick={handleComment}>
              {Comment}
              <div className="descriptors">Comment</div>
            </span>

            <span className="feedConnect__span" onClick={() => {}}>
              {Follow}
              <div className="descriptors">Follow</div>
            </span>
            <span className="feedConnect__span" onClick={() => {}}>
              {UnFollow}
              <div className="descriptors">UnFollow</div>
            </span>
            
          </div>
          {showComment ? (
            <Modal open={showComment} close={handleComment} userId={author} postId={postId}/>
          ) : null}
        </section>
      </main>
    </FEED>
  );
};

const FEED = styled.main`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
  main {
    display: flex;

    width: 100%;
    margin: 1rem;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0 3rem 0 3rem;
  }
  .feedUser {
    display: block !important;
  }
  .feedPost p {
    margin: 1rem;
    font-family: inherit;
    font-size: 1.5rem;
    word-spacing: 0.5rem;
    font-weight: 400;
    text-align: justify;
    text-justify: inter-word;

    &:hover {
      cursor: pointer;
    }
  }
  .feedConnect {
    padding: 0rem 1rem;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    & span {
      color: #974444;

      &:hover {
        cursor: pointer;

        .feedConnect__span .descriptors {
          display: block;
          position: relative;
          width: 6rem;
          padding: 0.5rem;
          color: white;
          background: black;

          &:after {
            position: absolute;
            left: -100px;
            top: 200px;
            content: "";
            width: 0;
            height: 0;
            border-right: solid 1rem rgba(0, 0, 0, 0.6);
            border-bottom: solid 1rem 10px transparent;
            border-top: solid 1rem transparent;
          }
        }
      }
    }
    .feedConnect__span .descriptors {
      display: none;
    }
  }
  .feedPost{
    &__title{
      font-family: 'Manrope', sans-serif;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      text-transform: uppercase;
    }
  }
`;

export default Feed;
