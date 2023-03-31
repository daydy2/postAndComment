import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import useAuthStore from "../store/store";
import { ThreeCircles } from "react-loader-spinner";
import { useMutation, useQuery } from "react-query";
import { Request } from "../api/request";
import { useNavigate, useParams } from "react-router-dom";
import InputIcon from "../Components/InputIcon";
import { Comment, Edit } from "../Components/Icons/Icons";
import { ThreeDots } from "react-loader-spinner";

const EditPostSchema = Yup.object().shape({
  title: Yup.string().min(5, "Too short"),
  content: Yup.string().min(5, "Too short"),
});

const EditPage = (props) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const user = useAuthStore.getState().user;
  const { postId } = useParams();
  const navigate = useNavigate();

  const threeC = (
    <ThreeCircles
      height="40"
      width="30"
      color="#974444"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor="#974444"
      innerCircleColor="#974444"
      middleCircleColor="#974444"
    />
  );

  const { data, isLoading, isError } = useQuery(
    "data",
    () =>
      Request("get", `/edit/${postId}`, null).then((res) => {
        console.log(res.post);
        return res.post;
      }),
    {
      returnPartialData: true,
    }
  );

  const mutation = useMutation(
    (formData) => Request("patch", `/edit/${postId}`, formData),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate("/");
      },
    }
  );
  useEffect(() => {
    if (data) {
      console.log("CommentPage " + " " + data);
      setPost({
        title: data.title,
        content: data.content,
      });
    }
  }, [data, setPost]);
  const handleSubmit = async (values) => {
    mutation.mutate(values);
  };
  const initialValues = {
    title: post.title,
    content: post.content,
  };

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

//   if (!data) {
//     return (
//       <div className="comment-loader">
//         <p style={{ fontSize: "18px", textAlign: "center" }}>
//           <em>No data</em>
//         </p>
//       </div>
//     );
//   }

  return (
    <EditForm>
      <Formik
        initialValues={initialValues}
        validationSchema={EditPostSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <Field />
              {/* <div className="edit-input">
                <label htmlFor="title" className="titleLabel">
                  Title:
                </label>
                <Field
                  as="textarea"
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  className="fieldInput"
                />
              </div> */}
              {/* <div className="edit-input">
                <label htmlFor="content" className="titleLabel">
                  Content:
                </label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  className="fieldInput"
                />
              </div> */}
              <button type="submit" className="btn">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>

      
    </EditForm>
  );
};
const EditForm = styled.main`
  background: white;
  padding: 15px 20px;
  .edit-input {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 5px 0;
    padding: 1rem 0;
  }
  .titleLabel {
    font-size: 15px;
    colour: #974444;
    margin: 10px 0;
    font-weight: bolder;
  }
  .fieldInput,
  .btn {
    padding: 10px 15px;
    outline: none;
    border: 1px solid #974444;
  }
  .btn {
    cursor: pointer;
    border-radius: 10px;
    margin: 5px 0;
    &:hover {
      transform: translateY(-4px);
    }
  }
`;
export default EditPage;
