import React from "react";
import WithHeader from "containers/Header/withHeader";
import RecipeList from "components/RecipeList";

import { Wrapper } from "./styles";

function Recipes() {
  const recipes = [
    {
      id: "1",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "2",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "3",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "4",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "5",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "6",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "7",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "8",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "9",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "10",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "11",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "12",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "13",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    },
    {
      id: "14",
      name: "Pork Sinigang",
      photo: "https://res.cloudinary.com/what-to-cook/image/upload/c_limit,w_240/v1576648516/categories/Pork_mqkgrx.png"
    }
  ];

  return (
    <WithHeader
      content={
        <Wrapper>
          <RecipeList recipes={ recipes } />
        </Wrapper>
      }
    />
  );
}

export default Recipes;
