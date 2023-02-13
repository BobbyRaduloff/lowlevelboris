import Layout from "@/components/layout";
import StyledLink from "@/components/styled_link";
import { getSortedPostData, Post } from "@/lib/posts";
import dayjs from "dayjs";
import Head from "next/head";
import React from "react";

export async function getStaticProps() {
  const allPostData = getSortedPostData();

  return {
    props: {
      allPostData,
    },
  };
}

type Props = {
  allPostData: Post[];
};

export default function Blog({ allPostData }: Props) {
  return (
    <div>
      <Head>
        <title> Low Level Boris: Blog </title>
        <meta
          name="description"
          content="Blog posts by Low Level Boris. Learn about modern web development, security, and graphics."
        />
      </Head>
      <Layout title="Blog">
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
              &nbsp;-&nbsp;
              {dayjs(post.date).format("MMMM D, YYYY")}
              <br />
              <span style={{ fontStyle: "italic" }}>{post.description}</span>
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  );
}
