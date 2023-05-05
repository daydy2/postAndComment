import React, { useEffect } from "react";
import Feed from "../Feed/Feed";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { Request } from "../../api/request";
import { useStore } from "../../store/store";
import { useQuery } from "react-query";
import Loading from "../LoadingModal";

const Feedlane = () => {
  const { data: storeData, setData } = useStore();

  const {
    data: queryData,
    isLoading,
    isError,
  } = useQuery(
    "queryData",
    () =>
      Request("get", "getpost", null).then((res) => {
        return res.post;
      }),
    {
      returnPartialData: true,
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    if (queryData) {
      console.log(queryData);
      setData(queryData);
    }
  }, [queryData, setData]);

  if (isLoading) {
    return (
      <div
        className="feedlane-loader"
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
      <div className="feedlane-loader">
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          <em>Error loading post</em>
        </p>
      </div>
    );
  }

  if (!queryData) {
    return (
      <div className="feedlane-loader">
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          <em>No data</em>
        </p>
      </div>
    );
  }

  if (queryData == []) {
    return (
      <div className="feedlane-loader">
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          <em>No data</em>
        </p>
      </div>
    );
  }

  return (
    <FEEDLANE>
      {queryData.map((feed) => {
        return (
          <Feed
            key={feed?._id}
            title={feed?.title}
            post={feed?.content}
            author={feed?.author.handle}
            postId={feed?._id}
            date={feed?.createdAt}
            authorId={feed?.author._id}
          />
        );
      })}
    </FEEDLANE>
  );
};

const FEEDLANE = styled.main`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .feedlane-loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Feedlane;
