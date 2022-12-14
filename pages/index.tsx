import React from "react";
import styled from "styled-components";
import Win95AppBar from "../components/appBar";
import redirect from "../lib/redirect";
//@ts-ignore
import { useClippy } from "@react95/clippy";

const Home: React.FC = () => {
  const { clippy } = useClippy();
  React.useEffect(() => {
    clippy && clippy?.speak("It looks like you're logged in");
  }, [clippy]);

  redirect();

  return (
    <Wrapper>
      <Win95AppBar />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;
