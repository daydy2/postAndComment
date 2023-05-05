import React, { useState } from "react";
import styled from "styled-components";
import { Field } from "formik";

const InputIcon = ({ inputName, iconleft, iconRight, placeholder, type, ...rest }) => {
  
  return (
    <Input>
      <div className="inputIcon">
        <span className="inputIcon__span-left">{iconleft}</span>
        <span className="inputIcon__span-center">
          <Field
            type={type}
            name={inputName}
            id={type}
            placeholder={placeholder}
            {...rest}
          />
        </span>
        <span className="inputIcon__span-right">{iconRight}</span>
      </div>
    </Input>
  );
};
const Input = styled.main`
  .inputIcon {
    display: grid;
    grid-template-columns: 10% 80% 10fr;
    grid-template-rows: 1fr;
    gap: 0px;
    padding: 10px;
    border: 1px solid #bababa;
    font-family: 'Lora', serif; font-size: 16px;
    border-radius: 8px;

    & input {
      width: 100%;
      outline: none;
      border-style: none;
      font-style: normal;
      font-weight: 500;
      font-family: 'Lora', serif; font-size: 16px;
      line-height: 29px;
      text-align: left;
      letter-spacing: 0.5px;
      padding-left: 10px;

      &::placeholder {
        color: #bababa;
      }
    }
    &__span {
      &-left {
        padding: 2px;
        border-right: 2px solid #001973;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &-right {
        padding: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
export default InputIcon;
