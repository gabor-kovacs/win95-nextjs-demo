import React from "react";
import styled from "styled-components";

import Win95AppBar from "../components/appBar";

import redirect from "../lib/redirect";
import FoodApp from "../components/foodApp";
//@ts-ignore
import { useClippy } from "@react95/clippy";
const Food: React.FC = () => {
  redirect();
  const { clippy } = useClippy();
  React.useEffect(() => {
    clippy && clippy?.speak("It looks like you're hungry");
  }, [clippy]);

  return (
    <Wrapper>
      <FoodApp />
      <Win95AppBar />
    </Wrapper>
  );
};

export default Food;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;
