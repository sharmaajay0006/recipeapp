import React from "react";
import styled from "styled-components";
import image from "../assesst/loader.gif";

function Loader() {
  return (
    <Container>
      <img src={image} alt="Loading..." />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loader;
