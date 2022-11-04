import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.status(404).send({ error: "please enter a valid email and password" });
    return;
  }
  const { email, password } = req.body;

  if (email != process.env.VALID_EMAIL) {
    res.status(401).send({ error: "invalid email or password" });
    return;
  }
  if (password != process.env.VALID_PASSWORD) {
    res.status(401).send({ error: "invalid password" });
    return;
  }
  if (!process.env.JWT_SECRET) {
    res.status(500).send({ error: "internal server error" });
    return;
  }

  const token = jwt.sign(
    {
      email,
      password,
    },
    process.env.JWT_SECRET
  );

  res.json({ token });
  res.end();
}
