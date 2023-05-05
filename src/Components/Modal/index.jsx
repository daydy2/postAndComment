import React from "react";
import { X, UserFocus } from "phosphor-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputIcon from "../InputIcon";
import { Edit } from "../Icons/Icons";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useMutation } from "react-query";
import { Request } from "../../api/request";
import userSlice from "../../store/store";
//import { useComment } from "../../store/store";

const CommentSchema = Yup.object().shape({
  comment: Yup.string().min(3, "Comment too short"),
});

const Modal = (props) => {
  const user = userSlice.getState().user;

  const initialValues = {
    comment: "",
    postId: props.postId,
    userId: user._id,
  };

  const navigate = useNavigate();
  const mutation = useMutation(
    (formData) => Request("post", "comment", formData),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate(`/comment/${props.postId}`);
      },
      onError: (error) => {
        setError(error);
      },
    }
  );

  const handleSubmit = async (values) => {
    mutation.mutate(values);
    props.close();
  };

  const renderError = (message) => <p className="login__div-btn">{message}</p>;

  return (
    <Container>
      <main className={props.open ? "modal" : "modal modal__close"}>
        <section className="modal__container">
          {!props.loading && (
            <div className="modal__closeBtn" onClick={props.close}>
              <X size={20} weight="bold" color={"#ffffff"} />
            </div>
          )}
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={CommentSchema}
            >
              {({ isSubmitting }) => (
                <Form className="modalForm">
                  <InputIcon
                    inputName={"comment"}
                    type={"text"}
                    iconRight={Edit}
                    iconleft={<UserFocus size={20} weight="thin" />}
                    placeholder={"What are your thoughts?"}
                  />
                  <Field name="userId" type="hidden" value={user._id} />
                  <Field name="postId" type="hidden" value={props.postId} />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    render={renderError}
                  />
                  <button type="submit" default={isSubmitting}>
                    Comment
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </main>
    </Container>
  );
};

const Container = styled.main`
  .modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(8px);

    &Form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & label,
      & span,
      & button {
        display: block;
        margin: 1rem 0;
      }
      & label {
        font-family: "serif";
        font-family: "Lora", serif;
        font-size: 1.8rem;
        font-weight: bold;
      }

      & button {
        outline: none;
        border-radius: 12px;
        padding: 14px 1rem;
        background: #974444;
        color: black;
        font-family: "Lora", serif;
        font-size: 1.6rem;
        text-align: center;
        border-style: none;
        transition: transform 0.3s ease-in;

        &:hover {
          cursor: pointer;
          transform: translateY(-3px);
        }
      }
    }

    &__container {
      width: 751px;
      padding-block: 5rem;
      background: #ffffff;
      border-radius: 24px;
      background-color: $neutral-white;
      flex-direction: column;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__close {
      display: none;
    }
    &__closeBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 61.25px;
      height: 61.25px;
      position: absolute;
      right: -2%;
      top: -5%;
      background: #974444;
      border-radius: 100px;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
export default Modal;
