import React from "react";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { AppBar, Button, MenuList, MenuListItem, Toolbar } from "react95";
import styled from "styled-components";
import isMobile from "@/hooks/isMobile";

import computer_icon from "../public/icons/computer.png";
import tiktok_icon from "../public/icons/tiktok.png";
import youtube_icon from "../public/icons/youtube.png";
import document_icon from "../public/icons/document.png";
import folder_icon from "../public/icons/folder.png";
import linkedin_icon from "../public/icons/linkedin.png";

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const pages = [
  {
    icon: computer_icon,
    name: "Home",
    onClick: (router: NextRouter) => router.push("/"),
    enabled: true,
  },
  {
    icon: folder_icon,
    name: "Blog",
    onClick: (router: NextRouter) => router.push("/blog"),
    enabled: true,
  },
  {
    icon: document_icon,
    name: "About Me",
    onClick: (router: NextRouter) => router.push("/about"),
    enabled: true,
  },
  {
    icon: tiktok_icon,
    name: "TikTok",
    onClick: () => window.location.assign("https://tiktok.com/@lowlevelboris"),
    enabled: true,
  },
  {
    icon: linkedin_icon,
    name: "LinkedIn",
    onClick: () =>
      window.location.assign("https://www.linkedin.com/in/borisraduloff/"),
    enabled: true,
  },
  {
    icon: youtube_icon,
    name: "YouTube",
    enabled: false,
  },
];

export default function Header() {
  const router = useRouter();
  const mobile = isMobile();
  const [openHamburger, setOpenHamburger] = React.useState(false);

  return (
    <AppBar style={{ position: "static" }}>
      {mobile ? (
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <Button
              onClick={() => setOpenHamburger(!openHamburger)}
              style={{ fontWeight: "bold" }}
              active={openHamburger}
            >
              <Image
                src={computer_icon}
                alt="hamburger menu icon"
                style={{ marginRight: 4 }}
              />
            </Button>
            {openHamburger && (
              <MenuList
                style={{
                  position: "absolute",
                  left: 0,
                  top: "100%",
                }}
              >
                {pages.map((page) => (
                  <MenuListItem
                    key={page.name}
                    onClick={() =>
                      page.enabled && page.onClick && page.onClick(router)
                    }
                    disabled={!page.enabled}
                  >
                    <Image
                      src={page.icon}
                      alt={`${page.name} page icon`}
                      style={{ marginRight: 4 }}
                    />
                    {page.name}
                  </MenuListItem>
                ))}
              </MenuList>
            )}
          </div>
          <Title>Low Level Boris</Title>
        </Toolbar>
      ) : (
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Title>Low Level Boris</Title>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() =>
                  page.enabled && page.onClick && page.onClick(router)
                }
                disabled={!page.enabled}
                style={{ fontWeight: "bold" }}
              >
                <Image
                  src={page.icon}
                  alt={`${page.name} page icon`}
                  style={{ marginRight: 4 }}
                />
                {page.name}
              </Button>
            ))}
          </div>
        </Toolbar>
      )}
    </AppBar>
  );
}
