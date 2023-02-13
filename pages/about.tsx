import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";

import boris_radulov from "../public/images/boris_radulov.jpg";
import StyledLink from "@/components/styled_link";
import { Anchor } from "react95";
import isMobile from "@/hooks/isMobile";

export default function About() {
  const mobile = isMobile();

  return (
    <div>
      <Head>
        <title>Low Level Boris: About Me</title>
        <meta
          name="description"
          content="Learn more about Low Level Boris, the creator of the Low Level Boris TikTok channel and blog."
        />
      </Head>
      <Layout title="About Me">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}> About Me </h1>
          <p style={{ fontSize: "1.1rem" }}>
            <Image
              src={boris_radulov}
              alt="Boris Radulov in a suit infront of a fire truck"
              style={{
                float: "left",
                marginRight: 12,
                width: !mobile ? "15%" : "40%",
                height: "auto",
              }}
            />
            Hi, there! Thanks for showing the extra interest to read about me.
            <br /> <br />
            My name is Boris Radulov. I&apos;m a software engineer from Sofia,
            Bulgaria, currently living in Leeds, England. I&apos;m currently
            finishing up my Bachelors Degree in Computer Science at the
            University of Leeds. While studying, I&apos;ve spent the last three
            years working to home my skills.
            <br /> <br />
            I&apos;ve been working in the industry for about three years now,
            although I&apos;ve been programming for way longer. My first
            internship was at a small bulgarian company in 2019, while I was
            still in high school. Since then I&apos;ve done a few internships,
            each more interesting than the last. Right now, I&apos;m the Product
            Manager at&nbsp;
            <StyledLink href="https://javery.bg">Javery LTD</StyledLink>. There,
            I&apos;m responsible for hiring and developer training, as well as
            managing product development and client communication. It&apos;s
            been pretty fun so far.
            <br /> <br />
            My interests include web development, graphics programming, and
            security. If you want to get in touch, hit me up at&nbsp;
            <Anchor href="mailto:boris.raduloff@gmail.com">
              boris.raduloff@gmail.com
            </Anchor>
            .
            <br /> <br />
            (btw, this iconic photo was taken when the kitchen at the Leeds Met
            caught fire during the CS Society ball)
          </p>
        </div>
      </Layout>
    </div>
  );
}
