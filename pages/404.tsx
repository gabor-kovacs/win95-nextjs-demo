import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";

import Win95AppBar from "../components/appBar";

import redirect from "../lib/redirect";

import { Window, WindowHeader, WindowContent, TextField, Button, AppBar } from "react95";
import Image from "next/image";
//@ts-ignore
import { useClippy } from "@react95/clippy";
const Home: NextPage = () => {
  redirect();
  const { clippy } = useClippy();
  React.useEffect(() => {
    clippy && clippy?.speak("It looks like you need to start using Ubuntu");
  }, [clippy]);

  return (
    <Wrapper>
      <Win95AppBar />
      {[...Array(16)].map((_, i) => (
        <Window style={{ width: 400, position: "absolute", left: i * 38, top: i * 38 }}>
          <WindowHeader active={i === 15 ? true : false} className="window-header">
            <span>Alert</span>
            <Button>
              <span className="close-icon">X</span>
            </Button>
          </WindowHeader>
          <WindowContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image src="/images/err.png" width={108} height={100} />
              <p>{"This is a certified Windows classic"}</p>
            </div>
            <Button>OK</Button>
          </WindowContent>
        </Window>
      ))}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;
