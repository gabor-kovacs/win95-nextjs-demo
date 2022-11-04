import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.body?.token) {
    res.status(401).send({ error: "not logged in" });
    return;
  }
  const { token } = req.body;

  if (!process.env.JWT_SECRET) {
    res.status(500).send({ error: "internal server error" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send({ OK: true });
  } catch (err) {
    res.status(401).send({ error: "invalid token" });
  }
}

export const verificationMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req;
  const token = headers?.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send({ error: "not logged in" });
    return;
  }
  if (!process.env.JWT_SECRET) {
    res.status(500).send({ error: "internal server error" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).send({ error: "invalid token" });
  }
};
