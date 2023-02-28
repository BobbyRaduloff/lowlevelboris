---
title: "AI Startup in 30 days: Choosing a tech stack"
description: "When testing out an MVP, development speed should be your priority above all else. Don't overengineer!"
tags:
  - ai
  - startup
  - nutshell
  - appdev
date: 2022-02-27
---

# Introduction
The first thing I need to get out of the way to start working on my [AI Email Client](/ai-startup-in-30-days-day-1) is the tech stack.
I have a few options here but I want to quickly talk about the mistake I usually make in such situations and how I plan to prevent it this time.

# The road to hell is paved with good intentions
Or in the development work, the road the bad architecture is premature optimisation.
I think we all often fall victim of this. Myself, I'd get execited about some project that I'm starting
and decide this is the prefect opportunity to try CassandraDB because it scales well along with Rust for increased developer ergonomics.
That's a dumb way to go about it.

# Your users >>> Anything else
Do you have a large user base or do you expect to get one soon? If the answer is no, you probably don't need to start of with Cassandra.
Do you have a large team of developers that you need to provide a unified development experience for? If the answer is no, you probably don't need to start with Rust.

Of course, these things will start to matter at some point, but you need to focus on what's in front of you.
You need to think of building a mobile app as a business rather than a programming exercise.

The first thing an overpaid analyst at one of the "big four" will tell you in a situation like this is
"How quickly and how cheaply can you get this to market?". And they'de be right to ask you that.
You have some theory about a gap in the market (that's why you're building the app, duhhh). So how do you validate it as fast as possible?

You write the simplest MVP with the core features in the language that will be fastest to set up and deploy.
Don't worry about how it will scale. That's a problem for the future you who has money from his 10k monthly active users.

# Then what?
After you iterate on your idea and get to the point where you're actually correct about your market niche, then you can sit down and re-evaluate.
Are you having performance issues? Can you hire more engineers without inducing existential dread in them when they see the code base?

If the answer to those types of questions is no, perfect. Keep doing what you're doing.
If the answer is yes, then you fix it.

I can't stress this enough: ***The cost of prematurely optimizing your software comes out of your time budget to make more MVPs to figure out your market***.

# My solution
For my mobile APP, I'm doing the absolute bare minimum. TypeScript and Express for the API.
Some third party SaaS for the in-app purchases. React native front end. Prisma with PostgreSQL for a DB.

Will this setup scale? Probably not. Does it matter now? Absolutely not.

Sign up for the [app's waitlist here](/nutshell).
