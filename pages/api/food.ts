import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import generateSlug from "../../lib/generateSlug";
import { verificationMiddleware } from "./verify";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  verificationMiddleware(req, res);

  switch (method) {
    case "GET":
      try {
        const foodDb = require("/data/foodDB.json");
        return res.status(200).json({
          foodDb,
        });
      } catch (error) {
        return res.status(500).json({
          error: "internal server error",
        });
      }

    case "POST":
      try {
        const foodDb = require("/data/foodDB.json");
        const newFood = { ...req.body, id: uuidv4(), slug: generateSlug(req.body.name), createdAt: new Date() };
        const newFoodDb = JSON.parse(JSON.stringify(foodDb));
        newFoodDb.push(newFood);
        fs.writeFileSync("data/foodDB.json", JSON.stringify(newFoodDb, null, 4));
        return res.status(201).json({
          OK: true,
          data: foodDb,
        });
      } catch (error) {
        return res.status(500).json({
          error: "internal server error",
        });
      }
  }
}
