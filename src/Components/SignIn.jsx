import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Login className="login">
      <div className="mainarea">
        <form className="form-area">
          <div className="top-text">
            <h3>Login to your account</h3>
          </div>
          <div className="input-area">
            <label htmlFor="text">Email or Phone Number</label>
            <input
              type="text"
              name=""
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-area">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="LOG IN"
            onClick={(e) => e.preventDefault()}
          />
        </form>
        <div className="below">
          <Link to="/register">
            <p>Don't have an account? Register</p>
          </Link>
          <Link to="/forgot">Forgot Password?</Link>
        </div>
      </div>
    </Login>
  );
};

const Login = styled.main`
  .mainarea {
    .form-area {
      background-color: white;
      width: 350px;
      padding: 2rem;
      border-radius: 18px;
      border-bottom-left-radius: 0px;
    }
    .top-text {
      text-align: center;
      padding-bottom: 10px;
      color: #083e9e;
      font-weight: 700;
    }
    .top-text h3 {
      color: #4a5568;
      font-weight: 400;
      font-family: "Lora", serif;
      font-size: 14px;
    }

    .input-area {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      label {
        font-family: "Lora", serif;
        font-size: 0.8rem !important;
        padding-bottom: 7px;
        font-weight: 700;
      }
      input {
        padding: 15px;
        font-family: "Lora", serif;
        font-size: 1.1rem;
        border: none;
        border-radius: 5px;
        outline: none;
        background-color: #edf2f7;
      }
    }
    input[type="submit"] {
      width: 100%;
      padding: 16px;
      background-color: #974444;
      color: white;
      border: none;
      outline: none;
      border-radius: 8px;
      border-bottom-left-radius: 0px;
      cursor: pointer;
      margin-bottom: 15px;
      font-family: "Lora", serif;
      font-size: 18px;
      font-weight: 700;

      &:hover {
        background-color: #d67a7a;
      }
    }
  }
  .below {
    text-align: center;
    margin-top: 1.5rem;
    a {
      color: #974444;
      text-decoration: none;
      p {
        padding-bottom: 15px;
      }
      &:hover {
        color: #c2bfbf;
      }
    }
  }

  @media (max-width: 320px) {
    & {
      height: 120vh;
    }
    .mainarea {
      .img {
        padding-top: 15px;
      }
      .form-area {
        width: 100%;
        margin: 0.7rem 0;
        padding: 0.7rem;
        .top-text {
          padding: 10px;

          p {
            font-family: "Lora", serif;
            font-size: 10px;
          }
        }
        .input-area {
          margin-bottom: 20px;
        }
      }
    }
  }
`;

export default SignIn;
