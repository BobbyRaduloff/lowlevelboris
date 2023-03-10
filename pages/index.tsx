import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import StyledLink from "@/components/styled_link";
import { Anchor } from "react95";
import { getSortedPostData } from "@/lib/posts";
import type { Post } from "@/lib/posts";
import dayjs from "dayjs";

export async function getStaticProps() {
  const allPostData = getSortedPostData().slice(0, 1);

  return {
    props: {
      allPostData,
    },
  };
}

type Props = {
  allPostData: Post[];
};

export default function Index({ allPostData }: Props) {
  return (
    <div>
      <Head>
        <title>Low Level Boris</title>
        <meta
          name="description"
          content="Low Level Boris's Personal Blog. Learn about modern web development and other things I find interesting."
        />
      </Head>
      <Layout title="Home Page">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}> Welcome! </h1>
          <p style={{ fontSize: "1.1rem" }}>
            Hi there, my name is Boris Radulov and I&apos;m the creator of the
            &quot;Low Level Boris&quot; TikTok channel and blog. You can read
            more about me&nbsp;
            <StyledLink href="/about">on the about page</StyledLink>. I&apos;m
            passionate about making software engineering accessible and
            entertaining to all. This blog serves to I aim to provide a deeper
            dive into the topics I cover in my TikTok videos, from web
            development to graphics and security. I&apos;ll also be providing
            code samples and links to GitHub repositories for everything I post.
            If you like the iconic Windows 95 design, feel free to star&nbsp;
            <Anchor href="https://github.com/react95-io/React95">
              React95
            </Anchor>
            &nbsp; on GitHub. Join me as I help simplify the complex world of
            software engineering.
            <br /> <br />
            You can find the source code for this blog&nbsp;
            <Anchor href="https://github.com/BobbyRaduloff/lowlevelboris">
              on my GitHub
            </Anchor>
            . Go check it out, it&apos;s seriously cool. It generates static web
            pages from markdown with NextJS.
          </p>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            Nutshell: AI-driven Email Summary App
          </h2>
          <p style={{ fontSize: "1.1rem" }}>
            I&apos;m currently working on a project called Nutshell. It&apos;s a
            mobile app that uses GPT3 to summarize emails and save you time.
            Sign up for the&nbsp;
            <StyledLink href="/nutshell">waitlist here</StyledLink>.
          </p>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            Latest Post
          </h2>
          <ul style={{ listStyleType: "disc" }}>
            {allPostData.map((post) => (
              <li
                key={post.id}
                style={{
                  listStyleType: "disc",
                  marginLeft: 14,
                  fontSize: "1.3rem",
                }}
              >
                <StyledLink href={`/blog/${post.id}`}>{post.title}</StyledLink>
                &nbsp;-&nbsp;{dayjs(post.date).format("MMMM D, YYYY")}
                <br />
                <span style={{ fontStyle: "italic" }}>{post.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
