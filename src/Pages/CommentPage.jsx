import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Feed from "../Components/Feed/Feed";
import MiniComment from "../Components/MiniComment/MiniComment";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Request } from "../api/request";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const CommentPage = () => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState("");

  const { data, isLoading, isError } = useQuery(
    "data",
    () =>
      Request("get", `/comment/${postId}`, null).then((res) => {
        console.log(res);
        return res;
      }),
    {
      returnPartialData: true,
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setPost(data);
    }
  }, [data, setPost]);

  if (isLoading) {
    return (
      <div
        className="comment-loader"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThreeDots
          height="100"
          width="80"
          radius="9"
          color="#974444"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="comment-loader">
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          <em>Error loading post</em>
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="comment-loader">
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          <em>No data</em>
        </p>
      </div>
    );
  }
  return (
    <Comment>
      <header className="commentPage__header">
        <Feed
          title={data.title}
          post={data.content}
          author={data.author}
          postId={data._id}
        />
      </header>
      {data.comments.map((comment) => {
        const daysAgo = dayjs().diff(comment.createdAt, 'day');
        return (
          <MiniComment
            key={comment._id}
            text={comment.content}
            commentAuthor={data._id}
            timeStamp={daysAgo}
          />
        );
      })}
    </Comment>
  );
};
const Comment = styled.main`
  width: 100%;
  position: relative;

  .comment-loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export default CommentPage;
