import React from "react";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

const Loading = ({ children }) => {
  return (
    <Load>
      <section className="loadingModal__section">
        <TailSpin
          height="80"
          width="80"
          color="#974444"
          ariaLabel="tail-spin-loading"
          radius="2"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </section>
    </Load>
  );
};
const Load = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;

  .loadingModal__section {
    width: 40vw;
    height: 35vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default Loading;
