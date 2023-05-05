import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import userSlice from "../store/store";
import { ThreeCircles } from "react-loader-spinner";
import { useMutation, useQuery } from "react-query";
import { Request } from "../api/request";
import { useNavigate, useParams } from "react-router-dom";
import InputIcon from "../Components/InputIcon";
import { Comment, Edit } from "../Components/Icons/Icons";
import { ThreeDots } from "react-loader-spinner";
import Loading from "../Components/LoadingModal";
import { toast } from "react-toastify";

const EditPostSchema = Yup.object().shape({
  title: Yup.string().min(5, "Too short"),
  content: Yup.string().min(5, "Too short"),
});

const EditPage = (props) => {
  const user = userSlice.getState().user;
  const editPost = userSlice((state) => state.editPost);
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

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery("editPost", async () => {
    const response = await editPost(postId);

    return response;
  });

  const mutation = useMutation(
    (formData) => Request("patch", `/edit/${postId}`, formData),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate("/");
        toast.success("Post updated successfully!");
      },
    }
  );

  const initialValues = {
    title: post?.title,
    content: post?.content,
    userId: user.user.userId,
  };
  // console.log(post?.title);
  // console.log(post?.content);

  const handleSubmit = async (values) => {
    mutation.mutate(values);
  };

  if (isError) {
    return (
      <div className="comment-loader">
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          <em>Error loading post</em>
        </p>
      </div>
    );
  }

  return (
    <EditForm>
      <Formik
        initialValues={initialValues}
        validationSchema={EditPostSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, submitForm, isSubmitting }) => {
          return (
            <Form>
              <div className="edit-input">
                <label htmlFor="title" className="titleLabel">
                  Title:
                </label>
                <Field
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  className="fieldInput"
                />
              </div>
              <Field
                type="hidden"
                name="userId"
                value={values.userId}
                onChange={handleChange}
              />
              <div className="edit-input">
                <label htmlFor="content" className="titleLabel">
                  Content:
                </label>
                <Field
                  id="content"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  className="fieldInput"
                />
              </div>
              <button type="submit" className="btn" onClick={submitForm}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
      {mutation.isLoading && <Loading />}
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
    font-family: "Lora", serif;
    font-size: 15px;
    color: #974444;
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
