import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { APIKey } from "../components/APIUtils";

const Searched = () => {
  const [searchedRecipes, setsearchedRecipe] = useState([]);
  const params = useParams();
  const getSearched = async (name) => {
    const key = APIKey();
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${name}&number=20`
    );
    const recipes = await data.json();
    // console.log(recipes.results);
    setsearchedRecipe(recipes.results);
  };
  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);
  return (
    <Grid>
      {searchedRecipes.map((item) => {
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

export default Searched;
