import React, { useEffect, useState, Children } from "react";
import styled from "styled-components";
import Feed from "../Components/Feed/Feed";
import MiniComment from "../Components/MiniComment/MiniComment";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Request } from "../api/request";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ArrowLeft } from "phosphor-react";

const CommentPage = () => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  console.log("comment post == " + post);
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
      console.log("CommentPage " + " " + data);
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
      <Link to='/'>
        <div className="goBack"> <ArrowLeft size={30} color="black" weight="bold"/></div>
      </Link>
      <header className="commentPage__header">
        <Feed
          title={data?.title}
          post={data?.content}
          author={data?.author.email}
          authorUserId={data?.author._id}
          postId={data?._id}
        />
      </header>
      {data &&
        data?.comments.map((comment) => {
          const daysAgo = dayjs().diff(comment?.createdAt, "day");
          
          return (
            <MiniComment
              key={comment?._id}
              text={comment?.content}
              //commentAuthor={comment.author.email }
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
