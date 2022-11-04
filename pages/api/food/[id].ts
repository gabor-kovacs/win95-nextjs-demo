import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { verificationMiddleware } from "../verify";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  verificationMiddleware(req, res);

  switch (method) {
    case "PUT":
      try {
        const foodDb = require("/data/foodDB.json");
        const indexToUpdate = foodDb.findIndex((food: FoodEntry) => food.id === id);

        if (indexToUpdate === -1) {
          return res.status(401).json({
            error: "not found",
          });
        }
        const newFoodDb = JSON.parse(JSON.stringify(foodDb));
        newFoodDb[indexToUpdate] = req.body;
        fs.writeFileSync("data/foodDB.json", JSON.stringify(newFoodDb, null, 4));

        return res.status(200).json({
          newFoodDb,
        });
      } catch (error) {
        return res.status(500).json({
          error: "internal server error",
        });
      }

    case "DELETE":
      try {
        const foodDb = require("/data/foodDB.json");
        const newFoodDb = foodDb.filter((food: FoodEntry) => food.id !== id);
        fs.writeFileSync("data/foodDB.json", JSON.stringify(newFoodDb, null, 4));
        return res.status(200).json({
          OK: true,
          data: newFoodDb,
        });
      } catch (error) {
        return res.status(500).json({
          error: "internal server error",
        });
      }
  }
}
