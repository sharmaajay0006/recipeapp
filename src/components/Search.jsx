import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };
  return (
    <FormStyle onSubmit={submitHandler}>
      <CenterDiv>
        <FaSearch />
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search Item"
          value={input}
        />
      </CenterDiv>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  margin-top: 1rem;

  input {
    border: none;
    font-size: 1.2rem;
    color: white;
    background: linear-gradient(35deg, #494949, #313131);
    padding: 0.5rem 2.6rem;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    color: white;
    transform: translate(100% -50%);
    font-size: 30px;
    margin-left: 8px;
    padding: 5px;
  }
`;
const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  border: 1px;
  color: white;
  border-radius: 20px;
  width: 500px;
  height: 100%;
  margin: 0 auto;
`;

export default Search;
