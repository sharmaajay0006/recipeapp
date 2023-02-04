import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { APIKey } from "./APIUtils";

function Vaggies() {
  const [veggies, setVeggies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getVeggies();
  }, []);
  const getVeggies = async () => {
    const check = localStorage.getItem("veggies");
    if (check === !undefined) {
      setVeggies(JSON.parse(check));
    } else {
      setLoading(true);

      const key = APIKey();
      console.log(key);
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${key}&number=25&tag=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("veggies", JSON.stringify(data.recipes));
      setVeggies(data.recipes);
      setLoading(false);
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{
            arrows: true,
            perPage: 3,
            pagination: false,
            drag: "free",
            gap: "4rem",
          }}
        >
          {loading ? (
            <div style={{}}>
              <Loader />
            </div>
          ) : (
            veggies.map((recipes, index) => {
              return (
                <SplideSlide key={index}>
                  <Card>
                    <Link to={"/recipe/" + recipes.id}>
                      <img src={recipes.image} alt={recipes.title} />
                      <p>
                        {recipes.title.length > 20
                          ? recipes.title.slice(0, 15) + "..."
                          : recipes.title}
                      </p>
                      <Gradient />
                    </Link>
                  </Card>
                </SplideSlide>
              );
            })
          )}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 2rem 1rem;
`;
const Card = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;

  img {
    border-radius: 1rem;
    ${"" /* position: relative; */}
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

// const LoaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-left: 100;
// `;
export default Vaggies;
