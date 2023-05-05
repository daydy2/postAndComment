import React, { useState } from "react";
import styled from "styled-components";
import { Comment, Follow, UnFollow } from "../Icons/Icons";
import Modal from "../Modal";
import ProfileImg from "../ProfileImg/ProfileImg";
import Typography from "../ProfileTypography/Typography";
import dayjs from "dayjs";
import { Trash } from "phosphor-react";
import { Request } from "../../api/request";
import { useMutation } from "react-query";
import { PencilLine } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import userSlice from "../../store/store";
import LoadingModal from "../LoadingModal";

const Feed = ({ title, post, author, postId, date, authorId }) => {
  const [open, setOpen] = useState(false);
  const user = userSlice.getState().user;
  const deletePost = userSlice((state) => state.deletePost);
  const loader = userSlice((state) => state.loader);
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState(false);
  const handleComment = () => {
    setShowComment(!showComment);
  };
  const daysAgo = dayjs().diff(date, "day");

  const handleDelete = () => {
    deletePost(postId);
  };
  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };
  return (
    <>
      <FEED>
        <main>
          <section className="feedUser">
            <ProfileImg width={"50px"} height={"50px"} />
            <Typography profileName={"Dinis Danielle"} fzname={"13px"} />
          </section>
          <section className="feedPost">
            <p className="feedPost__title">{title}</p>
            <p className="feedPost__post">{post}</p>
            <p>
              <span className="feedPost__author-span">
                <span>
                  <em>Author: </em>
                </span>
                <em>
                  <strong>{author}</strong>
                </em>
              </span>
              <span className="feedPost__day-span">
                {daysAgo}
                {daysAgo === 0 || daysAgo === 1 ? (
                  <span className="span-day">day</span>
                ) : (
                  <span className="span-day">days</span>
                )}
              </span>
            </p>
            {/* <p style={{ textAlign: "right", fontSize: "18px" }}>
            <em>{author}</em>
          </p> */}
            <div className="feedConnect">
              <span className="feedConnect__span" onClick={handleComment}>
                {Comment}
              </span>
              {user?.user.userId == authorId && (
                <span className="feedConnect__span" onClick={handleEdit}>
                  <PencilLine size={16} color="#974444" />
                </span>
              )}

              {user?.user.userId == authorId && (
                <span className="feedConnect__span" onClick={handleDelete}>
                  <Trash size={16} color="#974444" weight="bold" />
                </span>
              )}
            </div>
          </section>

          {showComment ? (
            <Modal
              open={showComment}
              close={handleComment}
              userId={typeof author === "string" ? authorId : author}
              postId={postId}
            />
          ) : null}
        </main>
      </FEED>
    </>
  );
};

const FEED = styled.main`
  @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
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
  .feedPost {
    width: 100%;

    &__title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      word-spacing: 0.5rem;
      text-align: left;
      text-transform: capitalize;
    }
  }
  .feedPost p {
    margin: 1rem;
    font-family: inherit;
    font-size: 1.5rem;
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
    justify-content: space-around;
    align-items: flex-start;

    & span {
      color: #974444;
      padding: 8px;

      &:hover {
        cursor: pointer;
        background: #f7e6e6;
        box-shadow: 0px 1px 9px -1px rgba(229, 144, 144, 0.75);
        -webkit-box-shadow: 0px 1px 9px -1px rgba(229, 144, 144, 0.75);
        -moz-box-shadow: 0px 1px 9px -1px rgba(229, 144, 144, 0.75);

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
  .feedPost {
    &__title {
      font-family: "sans-serif";
      text-align: center;
      font-weight: bolder;
      font-size: 20px;
      text-transform: capitalize;
      padding: 1rem 0;
    }
    &__author-span {
      margin-right: 15px;
      opacity: 0.6;
      margin-top: 8px;
    }
  }
  .span-day {
    margin-left: 2px;
  }
`;

export default Feed;
