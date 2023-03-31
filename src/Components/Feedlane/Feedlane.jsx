import React, { useEffect } from "react";
import Feed from "../Feed/Feed";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { Request } from "../../api/request";
import { useStore } from "../../store/store";
import { useQuery } from "react-query";





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

  if(queryData == []){
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
      {queryData.map((datum) => {
        console.log('this is my error' +' ' +datum.author);
        return (
          <Feed
            key={datum._id ? datum._id : ''}
            title={datum.title ? datum.title : ''}
            post={datum.content ? datum.content : ''}
            author={datum.author.handle ? datum.author.handle : ''}
            postId={datum._id ? datum._id : ''}
            date={datum.createdAt ? datum.createdAt : ''}
          />
        );
      })}
    </FEEDLANE>
  );
};

const FEEDLANE = styled.main`
width: 80%:
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

 .feedlane-loader{
    display: flex;
    justify-content: center;
    align-items: center;
 }
`;

export default Feedlane;
