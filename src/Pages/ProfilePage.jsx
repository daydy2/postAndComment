import { AlignBottom, At, User, UserFocus } from "phosphor-react";
import React, { useRef } from "react";
import styled from "styled-components";
import InputIcon from "../Components/InputIcon";
import ProfileImg from "../Components/ProfileImg/ProfileImg";
import { Edit, Mail } from "../Components/Icons/Icons";
import ImagePicker from "../Components/ImagePicker";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import userSlice from "../store/store";
import { useMutation, useQuery } from "react-query";
import { Request } from "../api/request";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import Loading from "../Components/LoadingModal";

const ProfileSchema = Yup.object().shape({
  handle: Yup.string().required("Field can not be empty"),
  firstname: Yup.string().required("Field can not be empty"),
  lastname: Yup.string().required("Field can not be empty"),
  email: Yup.string().email(),
});

const ProfilePage = () => {
  const user = userSlice.getState().user;
  const navigate = useNavigate();
  const formikRef = useRef(null);

  const { data, isLoading, isError } = useQuery(
    "data",
    () =>
      Request("get", `profile/${user.user.userId}`, null).then((res) => {
        console.log(res);
        return res;
      }),
    {
      returnPartialData: true,
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
  const mutation = useMutation(
    (formData) => Request("patch", "profile", formData),
    {
      onSuccess: (data) => {
        console.log(data);
        // queryClient.invalidateQueries("data");
        navigate("/");
      },
    }
  );

  const initialValues = {
    email: "",
    handle: user.user.handle,
    lastname: user.user.lastname,
    firstname: user.user.firstname,
    userId: user.user.userId,
  };

  const handleSubmit = async (values) => {
    mutation.mutate(values);
    formikRef.current.resetForm({ values: initialValues });
    setSubmitting(false);
  };

  const renderError = (message) => (
    <p className="profilePage__div-err">{message}</p>
  );

  return (
    <MyProfile>
      {/* <header className="profilePage__header">
        <ImagePicker>
          <ProfileImg
            width="500px"
            height="500px"
            style={{ borderRadius: "20px" }}
          />
        </ImagePicker>
      </header> */}
      <header>
        <p className="header">Edit your Profile</p>
      </header>
      <Formik
        validationSchema={ProfileSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ isSubmitting }) => (
          <Form className="profilePage__form">
            <div className="profilePage__div">
              <label htmlFor="handle">Handle</label>
              <InputIcon
                inputName={"handle"}
                type={"text"}
                placeholder={
                  user.user.handle ? user.user.handle : "Your preferred Handle"
                }
                iconleft={<At size={16} weight="thin" />}
                iconRight={Edit}
              />
            </div>
            <ErrorMessage name="handle" component="div" render={renderError} />
            <div className="profilePage__div">
              <label htmlFor="firstname">First Name</label>
              <InputIcon
                inputName={"firstname"}
                type={"text"}
                placeholder={
                  user.user.firstname ? user.user.firstname : "Your firstname"
                }
                iconleft={<User size={16} />}
                iconRight={Edit}
              />
            </div>
            <ErrorMessage
              name="firstname"
              component="div"
              render={renderError}
            />
            <div className="profilePage__div">
              <label htmlFor="lastname">Last Name</label>
              <InputIcon
                inputName={"lastname"}
                type={"text"}
                placeholder={
                  user.user.lastname ? user.user.lastname : "Your lastname"
                }
                iconleft={<User size={16} />}
                iconRight={Edit}
              />
            </div>
            <ErrorMessage
              name="lastname"
              component="div"
              render={renderError}
            />
            <div className="profilePage__div">
              <label htmlFor="email">Email</label>
              <InputIcon
                type={"email"}
                inputName={"email"}
                placeholder={user.user.email ? user.user.email : ""}
                iconleft={Mail}
                iconRight={Edit}
                disabled={true}
              />
            </div>
            <div className="profilePage__div">
              <label htmlFor="role">Tier</label>
              <InputIcon
                type={"text"}
                inputName={"role"}
                placeholder={user.user.role ? user.user.role : ""}
                iconleft={<AlignBottom size={20} weight="thin" />}
                iconRight={Edit}
                disabled={true}
              />
            </div>
            <Field type="hidden" name="userId" value={user.user.userId} />
            <div className="profilePage__div-btn">
              <button type="submit" disabled={isSubmitting}>
                {mutation.isLoading ? threeC : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {mutation.isLoading && <Loading />}
    </MyProfile>
  );
};
const MyProfile = styled.main`
  background: #ffffff;
  padding: 2rem 1.5rem;

  header {
    p {
      text-align: left;
      font-weight: 600;
      font-family: "Lora", serif;
      font-size: 20px;
      text-transform: capitalize;
      text-align: center;
      margin-block: 2rem;
    }
  }

  .profilePage__header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profilePage__div {
    margin-bottom: 16px;
    padding: 1rem 0;

    & label {
      font-family: "Lora", serif;
      font-size: 2rem;
      font-weight: 400;
      margin: 10px 0;
    }
    &-btn {
      margin: 16px 0;
      width: 100%;
      text-align: center;
    }
  }
  .profilePage__form {
    & button {
      padding: 1.5rem 2.5rem;
      outline: none;
      border: none;
      border-radius: 16px;
      background: #974444;
      color: black;
      font-family: "sans-serif";
      font-family: "Lora", serif;
      font-size: 16px;
      text-align: center;
      font-weight: 500;
      margin: 0 auto;
      text-transform: uppercase;
      transition: transform 0.4s ease-in;

      &:hover {
        cursor: pointer;
        transform: translateY(-3px);
        transform: scaleX(3px);
      }
    }
  }
`;
export default ProfilePage;
