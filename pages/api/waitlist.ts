import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

type Request = {
  email: string;
};

type Response = {
  status: "success" | "error";
  error?: string;
};

export default async function waitlistHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== "POST") {
    return res.status(405).send({
      status: "error",
      error: "Method not allowed",
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      status: "error",
      error: "Missing email field",
    });
  }
  const { email } = req.body as Request;

  if (!validateEmail(email)) {
    return res.status(400).send({
      status: "error",
      error: "Invalid email",
    });
  }

  try {
    await prisma.waitlistEntry.create({
      data: {
        email,
      },
    });
  } catch (e) {
    return res.status(400).send({
      status: "error",
      error: "Email already in waitlist",
    });
  }

  return res.status(200).send({
    status: "success",
  });
}
