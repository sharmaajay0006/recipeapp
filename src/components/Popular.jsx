import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import { APIKey } from "./APIUtils";

function Popular() {
  const [popular, setPopuler] = useState([]);
  useEffect(() => {
    getPopular();
  }, []);
  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopuler(JSON.parse(check));
    } else {
      const key = APIKey();
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${key}&number=25`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      console.log(data);
      setPopuler(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            arrows: true,
            perPage: 4,
            pagination: false,
            drag: "free",
            gap: "4rem",
          }}
        >
          {popular.map((recipes, index) => {
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
          })}
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

export default Popular;
