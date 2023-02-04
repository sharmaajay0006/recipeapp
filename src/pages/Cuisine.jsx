import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { APIKey } from "../components/APIUtils";
const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    // const key = "5453de8db6f24e5584f0ec000c096292";
    const key = APIKey();
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&cuisine=${name}&number=20`
    );
    const recipes = await data.json();
    console.log(recipes.results);
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <Grid>
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  height: 70%;
  width: 100%;
  position: relative;

  img {
    border-radius: 1rem;
    position: relative;
    left: 0;
    width: 150%;
    height: 100%;
    object-fit: cover;
    perpage: 4;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: black;
    text-align: center;
    font-weight: 800;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Cuisine;
