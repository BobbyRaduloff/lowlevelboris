import React from "react";
import { getPostDataWithContent, getSortedPostData } from "@/lib/posts";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";
import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Layout from "@/components/layout";
import Head from "next/head";
import dayjs from "dayjs";
import { Separator } from "react95";
import styled from "styled-components";

import "highlight.js/styles/atom-one-dark-reasonable.css";

export async function getStaticPaths() {
  const allPostsSorted = getSortedPostData();
  const paths = allPostsSorted.map((post) => ({
    params: { slug: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const post = getPostDataWithContent(slug);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ["anchor"] },
          },
          { behaviour: "wrap" },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter: {
          title: post.title,
          date: dayjs(post.date).format("MMMM D, YYYY"),
          description: post.description,
          tags: post.tags,
          minutes: post.minutes,
        },
      },
    },
  };
};

type Props = {
  post: {
    source: MDXRemoteSerializeResult;
    frontmatter: {
      title: string;
      date: string;
      description: string;
      tags: string[];
      minutes: string;
    };
  };
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-top: 0.5rem;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
    maring-top: 0.5rem;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-top: 0.5rem;
  }

  h4 {
    font-size: 1.2em;
    margin-top: 0.25rem;
  }

  h5 {
    font-size: 1.2rem;
    margin-top: 0.25rem;
  }

  h6 {
    font-size: 1.1rem;
    margin-top: 0.25rem;
  }

  p {
    font-size: 1rem;
  }

  code {
    minwidth: 100%;
    background-color: ${({ theme }) => theme.canvas};
  }

  pre > code {
    display: block;
    max-width: 100%;
    overflow: scroll;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }

  a {
    color: ${({ theme }) => theme.anchor};
    text-decoration: underline;
  }

  h1 > code {
    background-color: transparent;
  }

  h2 > code {
    background-color: transparent;
  }

  h3 > code {
    background-color: transparent;
  }

  h4 > code {
    background-color: transparent;
  }

  h5 > code {
    background-color: transparent;
  }

  h6 > code {
    background-color: transparent;
  }

  ul,
  ol {
    margin-left: 18px;
  }

  ol > li {
    list-style-type: decimal;
  }

  ul > li {
    list-style: disc;
  }

  img {
    display: block;
    height: auto;
    max-width: 100%;
  }
`;

export default function Blog({ post: { source, frontmatter } }: Props) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
      </Head>
      <Layout title={frontmatter.title} big>
        <div>
          <p style={{ fontStyle: "italic" }}>
            Published on {frontmatter.date}&nbsp; &mdash; {frontmatter.minutes}
          </p>
          <Separator />
          <Content>
            <MDXRemote {...source} />
          </Content>
        </div>
      </Layout>
    </>
  );
}
