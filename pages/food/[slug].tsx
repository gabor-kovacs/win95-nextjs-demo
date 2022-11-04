import React, { useEffect } from "react";
import styled from "styled-components";
import Win95AppBar from "../../components/appBar";
import redirect from "../../lib/redirect";
import FoodApp from "../../components/foodApp";
import ViewFoodWindow from "../../components/viewFood";

const getFoodIds = () => {
  const foodDb = require("/data/foodDB.json");
  return foodDb.map((food: FoodEntry) => {
    return {
      params: {
        slug: food.slug,
      },
    };
  });
};

interface Props {
  foodInfo: FoodEntry;
}

const FoodInfo: React.FC<Props> = ({ foodInfo }) => {
  redirect();

  useEffect(() => {
    console.log(foodInfo);
  }, [foodInfo]);

  return (
    <Wrapper>
      <FoodApp inactive={true} />
      <ViewFoodWindow foodInfo={foodInfo} />
      <Win95AppBar />
    </Wrapper>
  );
};

export default FoodInfo;

export async function getStaticPaths() {
  const paths = getFoodIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const foodDb = require("/data/foodDB.json");
  const foodInfo = foodDb.find((food: FoodEntry) => food.slug === params.slug);

  return {
    props: {
      foodInfo,
    },
  };
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;
