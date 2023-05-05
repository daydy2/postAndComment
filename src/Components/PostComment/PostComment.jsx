import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const PostComment = (props) => {

  const { register, handleSubmit, trigger } = useForm();
  const onSubmit = (data) => console.log(data);
  let showComment = 'main__comment close';
  if(props.show){
    showComment = 'main__comment'
  }
  return (
    <Comment>
      <main className={showComment} >
        <form onSubmit={handleSubmit(onSubmit)} >
          <label>
            <span>Comment</span>
            <input {...register("comment", { minLength: 5 })} />
          </label>
          <input type="submit" value="comment" onClick={props.close}/>
        </form>
      </main>
    </Comment>
  );
};

const Comment = styled.main`
  .main__comment {
    background-color: #ffffff;
    padding: 2rem 0;
    width: 50vw;
    margin: 25vh auto;
    position: absolute;
    border-radius: 30px 0 30px 0;
    left: 32rem;
    top: 0px;
    z-index: 1000;

    & form {
      margin: 0 auto;
      padding: 1rem;
    }
    & label,
    & input {
      display: block;
      margin: 1.5rem 0;
    }
    & label > input {
      border-style: none;
      outline: none;
      border-left: 3px solid #974444;
      padding: 2rem 1rem;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
      width: 100%;
      font-family: 'Lora', serif;
      font-size: 1.8rem;
    }
    & label {
       
      font-family: 'Lora', serif;
      font-size: 1.8rem;
      font-weight: 600;
      text-align: center;
    }
    & input[type=submit]{
        margin: 0 auto;
        background-color: #974444;
        padding: 1rem 2rem;
        border: none;
        outline: none;
        transition: transform .4s ease-in;
        color: white;
        
        &:hover{
            cursor: pointer;
            transform: translateY(3px);
        }
        
    }
  }
  .close{
    display: none;
  }
`;
export default PostComment;
