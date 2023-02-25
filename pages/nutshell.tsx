import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import StyledLink from "@/components/styled_link";
import { Anchor, Button, Counter, TextInput } from "react95";
import styled from "styled-components";
import dayjs from "dayjs";

const Form = styled.form`
  display: flex;
  justify-items: center;
  flex-direction: column;
  gap: 12px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

export default function Nutshell() {
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [email, setEmail] = React.useState("");

  const release_date = dayjs("2023-03-31");
  const current_date = dayjs();
  const days_left = release_date.diff(current_date, "day");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resp = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!resp.ok) {
      const { error } = await resp.json();
      setError(
        error ? error : "Something went wrong. Please try again later..."
      );
      return;
    }

    setEmail("");
    setSuccess("Thanks for signing up!");
  };

  return (
    <div>
      <Head>
        <title>Low Level Boris: Nutshell Waitlist</title>
        <meta
          name="description"
          content="Sign up for Nutshell's waitlist. Nutshell is an AI app that summarizes and filters your emails for you"
        />
      </Head>
      <Layout title="Home Page">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Nutshell: AI-driven Email Client
          </h1>
          <p style={{ fontSize: "1.1rem" }}>
            Nutshell is an AI-driven email client that summarizes and filters
            your emails for you. It&apos;s currently in development by&nbsp;
            <StyledLink href="/about">me</StyledLink> and&nbsp;
            <Anchor href="https://www.linkedin.com/in/mitev-nikolay/">
              Nikolay Mitev
            </Anchor>
            . If you want to use it when it's ready, please sign up for the
            waitlist below.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "auto",
              justifyItems: "center",
              justifyContent: "center",
              marginRight: "auto",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Days Until Release
            </h2>
            <Counter
              value={days_left}
              style={{
                maxWidth: "min-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              size="lg"
            />
          </div>

          <Form onSubmit={handleSubmit}>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.smith@example.com"
              type="email"
            />
            <Button primary type="submit">
              Get me onboard!
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </Form>
        </div>
      </Layout>
    </div>
  );
}
