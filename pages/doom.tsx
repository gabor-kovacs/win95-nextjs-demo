import React from "react";
import styled from "styled-components";
import Win95AppBar from "../components/appBar";
import redirect from "../lib/redirect";
import { Window, WindowHeader, Button, WindowContent } from "react95";
//@ts-ignore
import { useClippy } from "@react95/clippy";
import { useRouter } from "next/router";

const Doom: React.FC = () => {
  const router = useRouter();
  const { clippy } = useClippy();
  React.useEffect(() => {
    clippy && clippy?.speak("It looks like you're logged in");
  }, [clippy]);

  redirect();

  return (
    <Wrapper>
      <Window>
        <WindowHeader className="window-header">
          <span>doom.exe</span>
          <Button onClick={() => router.push("/")}>
            <span className="close-icon">X</span>
          </Button>
        </WindowHeader>
        <WindowContent>
          <iframe
            width="680"
            height="400"
            src="https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos?anonymous=1"
          />
        </WindowContent>
      </Window>
      <Win95AppBar />
    </Wrapper>
  );
};

export default Doom;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;
