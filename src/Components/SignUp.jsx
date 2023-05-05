import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
    phone: "",
    referer: "",
    name: "",
    about: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormDetails((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <Register className="login">
      <div className="mainarea">
        <form className="form-area">
          <div className="top-text">
            <h3>Create a Secure Account</h3>
          </div>
          <div className="input-area">
            <label htmlFor="text">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={formDetails.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-area">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-area">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              value={formDetails.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input-area">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formDetails.password}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="CREATE ACCOUNT"
            onClick={(e) => e.preventDefault()}
          />
        </form>
        <div className="below">
          <Link to="/login">
            <p>Already have an account? Log In</p>
          </Link>
        </div>
      </div>
    </Register>
  );
};

const Register = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "lora", sans-serif !important;
  font-weight: 500;
  .mainarea {
    .img {
      text-align: center;
    }
    .form-area {
      max-width: 100%;
      width: 350px;
      background-color: white;
      padding: 2rem;
      border-radius: 18px;
      border-bottom-left-radius: 0px;

      .top-text {
        text-align: center;
        padding-bottom: 10px;
        color: #083e9e;
        font-weight: 700;

        p {
          color: #4a5568;
          font-weight: 400;
          font-family: "Lora", serif;
          font-size: 14px;
        }
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
        input,
        select {
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
        font-size: 15px;
        font-weight: 700;

        &:hover {
          background-color: #d67a7a;
        }
      }
    }
    .below {
      margin-top: 1.5rem;
      text-align: center;
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
  }

  @media (max-width: 428px) {
    margin: 0 1rem;
    .form-area {
      width: 100% !important;
      margin: 2rem auto !important;

      .top-text {
        p {
          padding: 10px 0;
        }
      }
    }
    .below {
      font-family: "Lora", serif;
      font-size: 13px;
    }
  }
`;

export default SignUp;
