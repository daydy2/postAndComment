import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Picture, Edit } from "../Icons/Icons";
import InputIcon from "../InputIcon";
import { NotePencil, UsersThree } from "phosphor-react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import userSlice from "../../store/store";
import { useMutation } from "react-query";
import { Request } from "../../api/request";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import Loading from "../LoadingModal";

const NewPost = () => {
  const user = userSlice.getState().user;
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const initialValues = {
    title: "",
    content: "",
    userId: user?.user.userId,
  };
  const PostSchema = Yup.object({
    title: Yup.string().required("Title is required").min(5).max(101),
    content: Yup.string().required("Content is required").min(5).max(101),
  });

  const mutation = useMutation(
    (formData) => Request("post", "post", formData),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate("/");
        toast.success("Post successful!");
      },
      onError: (error) => {
        setError(error);
        toast.error(error.message);
      },
    }
  );
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

  const onSubmit = async (values) => {
    mutation.mutate(values);
    formikRef.current.resetForm({ values: initialValues });
    setSubmitting(false);
  };
  const renderError = (message) => <p className="form__label">{message}</p>;

  return (

      <Post>
        <main>
          {error && <div className="postField">Unable to Post</div>}
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={PostSchema}
            innerRef={formikRef}
          >
            {({ isSubmitting }) => (
              <Form>
                <span className="form__label">Post</span>
                <div className="postField">
                  <InputIcon
                    type={"text"}
                    inputName={"title"}
                    placeholder={"Title Please?"}
                    iconRight={Edit}
                    iconleft={<NotePencil size={16} weight="thin" />}
                  />
                </div>
                <div className="postError">
                  <ErrorMessage
                    name="title"
                    component="div"
                    render={renderError}
                  />
                </div>
                <div className="postField">
                  <InputIcon
                    type={"text"}
                    inputName={"content"}
                    placeholder={"What's on your mind?"}
                    iconRight={Edit}
                    iconleft={<NotePencil size={16} weight="thin" />}
                  />
                  <Field
                    type="hidden"
                    name="userId"
                    value={user?.user.userId}
                  />
                </div>
                <div className="postError">
                  <ErrorMessage
                    name="content"
                    component="div"
                    render={renderError}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="formButton"
                >
                  {mutation.isLoading ? threeC : "Post"}
                </button>
              </Form>
            )}
          </Formik>
        </main>
        {mutation.isLoading && <Loading />}
      </Post>
    
  );
};

const Post = styled.main`
  width: 100%;
  padding: 1rem;
  text-align: center;
  background: #ffffff;
  .postField {
    margin: 20px 0 15px 0;
  }
  form {
    width: 100%;
    border-radius: 0 30px 0 30px;
    padding: 0.5rem;

    & label {
      display: block;
      width: 100%;
      margin: 0.9rem 0;
    }
  }
  .form__label {
    font-family: "Lora", serif;
    font-size: 17px;
    font-weight: bolder;
    line-height: 1.9px;
  }
  .formButton {
    outline: none;
    border: 1px solid #974444;
    border-radius: 10px;
    padding: 1rem 2rem;
    background: #bababa;
    color: #974444;
    margin-top: 15px;
    font-family: 'Lora', serif;
    font-size: 18px;
    text-transform: uppercase;
    transition: transform 0.4s ease-in;

    &:hover {
      cursor: pointer;
      transform: translateY(-4px);
    }
  }
`;
export default NewPost;

export const FollowerComp = () => {
  return (
    <Follower>
      <header className="follower__header">
        <UsersThree size={56} weight="thin" />
        <span className="follower__header-text">Followers</span>
        <hr />
      </header>
      <section className="follower__section">
        <ul className="follower__ul-list">
          <li className="follower__listItem">
            <span className="listItem-name">Dinis - </span>
            <span className="listItem-email">dinis@testmail.com</span>
          </li>
          <li className="follower__listItem">
            <span className="listItem-name">Dinis - </span>
            <span className="listItem-email">dinis@testmail.com</span>
          </li>
          <li className="follower__listItem">
            <span className="listItem-name">Dinis - </span>
            <span className="listItem-email">dinis@testmail.com</span>
          </li>
          <li className="follower__listItem">
            <span className="listItem-name">Dinis - </span>
            <span className="listItem-email">dinis@testmail.com</span>
          </li>
        </ul>
      </section>
    </Follower>
  );
};

const Follower = styled.main`
  margin: 3rem 0;
  padding: 10px;
  background: #ffffff;
  .follower {
    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: 'Lora', serif;
    }
    &__header-text {
      font-family: 'Lora', serif;
      font-size: 20px;
      font-weight: bold;
      margin: 10px 0;
    }
    &__section {
      margin-left: 20px;
    }
    &__ul-list {
      list-style: none;
      font-family: 'Lora', serif;
      font-size: 18px;
      font-weight: 400px;
    }
    &__listItem{
      border: 1px solid #974444;
      padding: 1rem;
      border-radius: 15px;
      margin: 10px 0;
    }
  }
`;
