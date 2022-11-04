import React from "react";

import { Window, WindowHeader, WindowContent, Button, TextInput } from "react95";

import Image from "next/image";
import axios from "axios";
import styled from "styled-components";

import { useRouter } from "next/router";
//@ts-ignore
import { useClippy } from "@react95/clippy";
import Win95AppBar from "../components/appBar";

const LoginPage: React.FC = () => {
  const { clippy } = useClippy();
  React.useEffect(() => {
    clippy && clippy?.speak("It looks like you're trying to log in");
  }, [clippy]);

  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  const handleCloseAlert = () => setShowAlert(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      const token = response.data.token;
      setErrorMsg("");
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const msg = error?.response?.data?.error;
        console.warn(msg);
        setErrorMsg(msg);
        setShowAlert(true);
      } else {
        // bruh
      }
    }
  };

  return (
    <>
      <Wrapper>
        {/* <Win95AppBar /> */}
        <Window>
          <WindowHeader active={!showAlert}>
            <span>Login</span>
          </WindowHeader>
          <WindowContent>
            <form onSubmit={handleSubmit}>
              <div style={{ width: 500 }}>
                <div style={{ display: "flex" }}>
                  <TextInput
                    required
                    name="email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <br />
                <TextInput
                  required
                  name="password"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                <Button type="submit" value="login" disabled={showAlert}>
                  Sign in
                </Button>
              </div>
            </form>
          </WindowContent>
        </Window>
        {showAlert && (
          <AlertWrapper>
            <Window style={{ width: 400 }}>
              <WindowHeader active={true}>
                <span>Alert</span>
              </WindowHeader>
              <WindowContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image src="/images/err.png" width={108} height={100} />
                  <p>{errorMsg ?? "Something went wrong"}</p>
                </div>
                <Button onClick={handleCloseAlert}>OK</Button>
              </WindowContent>
            </Window>
          </AlertWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
`;

const AlertWrapper = styled.div`
  position: absolute;
`;
