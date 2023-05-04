import React, { useState } from "react";
import styled from "styled-components";
import { UserCircle, Envelope, Password } from "phosphor-react";
import InputIcon from "../../Components/InputIcon";
import { Edit } from "../../Components/Icons/Icons";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import useAuthStore from "../../store/store";
import { Request } from "../../api/request";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from 'react-toastify';

const initialValues = {
  email: "",
  password: "",
};
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Your password is too short."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Login = () => {
  const [error, setError] = useState(null);
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();
  const mutation = useMutation(
    (formData) => Request("post", "login", formData),
    {
      onSuccess: (data) => {
        console.log(data);
        setUser(data);
        navigate("/");
        toast.success('Login successful!');

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
      color="#bababa"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor="#bababa"
      middleCircleColor="#bababa"
    />
  );
  
  const handleSubmit = async (values) => {
    mutation.mutate(values);
  };

  const renderError = (message) => <p className="login__div-btn">{message}</p>;

  return (
    <Register>
      <header className="login__header">
        <UserCircle size={56} weight="thin" />
        <span>login</span>
      </header>
      {error && <div className="login__div-input">Incorrect Details</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {({ isSubmitting }) => (
          <Form className="login__form">
            <div className="login__div-input">
              <label htmlFor="email">Email</label>
              <InputIcon
                inputName={"email"}
                type={"email"}
                placeholder={"Enter your email"}
                iconleft={<Envelope size={16} weight="thin" />}
                iconRight={Edit}
              />
              <ErrorMessage name="email" component="div" render={renderError} />
            </div>
            <div className="login__div-input">
              <label htmlFor="bio">Password</label>
              <InputIcon
                inputName={"password"}
                type={"password"}
                placeholder={"Enter your password"}
                iconleft={<Password size={16} weight="thin" />}
                iconRight={Edit}
              />
              <ErrorMessage
                name="password"
                component="div"
                render={renderError}
              />
            </div>

            <div className="login__div-btn">
              <button type="submit" disabled={isSubmitting}>
                {mutation.isLoading ? threeC : "login"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Register>
  );
};

const Register = styled.main`
  background: #ffffff;
  border-radius: 20px;
  padding: 10rem 1rem 1rem 1rem;
  margin: 10rem auto;
  width: 50%;

  .login__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & span {
      font-size: 2rem;
      font-weight: bold;
      line-height: 1.9rem;
      margin: 10px 0;
    }
  }
  .login__div {
    &-input {
      margin-bottom: 16px;
      padding: 1rem 0;

      & label {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 1rem;
      }
    }
    &-btn {
      margin: 16px 0;
      width: 100%;
      text-align: center;

      & button {
        padding: 1.5rem 2.5rem;
        outline: none;
        border: none;
        border-radius: 16px;
        background: #974444;
        color: black;
        font-family: "sans-serif";
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
  }
  @media screen and (max-width: 768px) {
    & {
      margin: 1rem auto;
      padding: 1rem;
    }
  }
`;
export default Login;
