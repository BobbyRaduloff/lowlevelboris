import React from "react";
import styled from "styled-components";
import Header from "@/components/header";
import { Window, WindowContent, WindowHeader } from "react95";
import isMobile from "@/hooks/isMobile";

const FlexBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.desktopBackground};
`;

export type LayoutProps = React.PropsWithChildren<{
  title?: string;
  big?: boolean;
}>;

export default function Layout({ title, big, children }: LayoutProps) {
  const mobile = isMobile();

  return (
    <FlexBody>
      <Header />
      <div
        style={{
          width: "93vw",
          margin: "3%",
        }}
      >
        <Window
          style={{
            position: "static",
            width: "100%",
          }}
        >
          <WindowHeader
            style={
              big
                ? { fontSize: "1.6rem", height: mobile ? "200%" : "100%" }
                : {}
            }
          >
            {title ? title : "Low Level Boris"}
          </WindowHeader>
          <WindowContent>{children}</WindowContent>
        </Window>
      </div>
    </FlexBody>
  );
}
