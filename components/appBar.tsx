import React from "react";
import { AppBar, Toolbar, Button, Frame, MenuList, MenuListItem, Separator } from "react95";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Win95AppBar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const logout = () => {
    localStorage?.removeItem("token");
    router.push("/login");
  };

  return (
    <div style={{ width: "100%", bottom: "50px", position: "fixed" }}>
      <AppBar style={{ position: "absolute" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Button onClick={() => setOpen(!open)} active={open} style={{ fontWeight: "bold" }}>
              <Image src={"/images/windows-0.png"} width={32} height={32} />
              Start
            </Button>
            {open && (
              <MenuList
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "100%",
                }}
                onClick={() => setOpen(false)}
              >
                <MenuListItem>
                  <Link href="/doom">
                    <a style={{ width: "100px" }}>
                      <Image src={"/images/doom.png"} width={24} height={24} />
                      <span> doom.exe </span>
                    </a>
                  </Link>
                </MenuListItem>
                <Separator />
                <MenuListItem>
                  <Link href="/food">
                    <a style={{ width: "80px" }}>
                      <Image src={"/images/write_wordpad-1.png"} width={24} height={24} />
                      <span> food.exe </span>
                    </a>
                  </Link>
                </MenuListItem>
                <Separator />
                <MenuListItem onClick={logout}>
                  <a>
                    <Image src={"/images/keys-2.png"} width={24} height={24} />
                    <span> Logout </span>
                  </a>
                </MenuListItem>
              </MenuList>
            )}
          </div>
          <Frame
            variant="well"
            style={{
              padding: "5px 10px",
            }}
          >
            {new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0")}
          </Frame>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Win95AppBar;
