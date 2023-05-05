import React from "react";
import styled from "styled-components";
import { Picture, Edit } from "../Icons/Icons";
import InputIcon from "../InputIcon";
import { NotePencil } from "phosphor-react";


const PostFeed = () => {
  const handleSubmit = (evt, data) => {
    evt.preventDefault();
  };

  return (
    <Post>
      <form onSubmit={handleSubmit(onSubmit)} className="feed__form">
        <label>
          <span>Post a Feed</span>
          <InputIcon
            type={"text"}
            placeholder={"What's on your mind?"}
            iconRight={Edit}
            iconleft={<NotePencil size={16} weight="thin" />}
          />
          <span>{Picture}</span>
          <input type="file" {...register("file")} />
        </label>

        <input type="submit" value="post" />
      </form>
    </Post>
  );
};

const Post = styled.main`
  width: 23vw;
  margin: 10rem 0 0 0rem;
  background-color: #ffffff;
  position: fixed;
  right: 0;
  z-index: 9;

  .feed__form {
    padding: 2rem 1rem;

    & label,
    & input {
      display: block;
      margin-bottom: 1rem;
    }

    & label {
      font-family: 'Lora', serif; font-size: 2rem;
      font-weight: bolder;
       
      text-align: center;
      margin-bottom: 1rem;
    }

    & input {
      margin: 3rem 0;
      width: 100%;
      outline: none;
      padding: 1rem 1.5rem;
    }
  }
`;
export default PostFeed;
