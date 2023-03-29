import React from "react";
import styled from "styled-components";

const MiniComment = ({ text, commentAuthor, timeStamp }) => {
  return (
    <Commentee>
      <section className="commentee__comment">
        <div className="commentee__comment-text">
          <p>{text}</p>
        </div>
        <div className="commentee__commenter">
          <span>
            <em>{commentAuthor}</em>
          </span>
          <span>{timeStamp}</span>
        </div>
      </section>
    </Commentee>
  );
};

const Commentee = styled.main`
  width: 70%;
  position: relative;
  left: 31%;
  .commentee {
    &__comment {
      padding: 1rem 1.5rem;
      background: #bababa;
      margin: 1rem 0;
      border-radius: 20px 20px 0 20px;

      &-text p {
        font-family: inherit;
        font-size: 1.8rem;
        line-height: 1.9rem;
        word-spacing: 0.5px;
      }
    }
    &__commenter {
      margin: 1rem 0;
      text-align: right;
      & span {
        font-family: inherit;
        font-size: 1.5rem;
        margin: 0px 10px 7px 0;
      }
    }
  }
`;
export default MiniComment;
