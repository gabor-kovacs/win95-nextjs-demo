import React from "react";
import styled from "styled-components";
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Toolbar,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
} from "react95";

import { useRouter } from "next/router";
import CreateFoodModal from "./createFood";
import EditFoodModal from "./editFood";

import axios from "axios";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
interface Props {
  inactive?: boolean;
}

const FoodApp: React.FC<Props> = ({ inactive }) => {
  const router = useRouter();

  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [foodDb, setFoodDb] = React.useState<FoodEntry[]>([]);
  const [refresh, forceRefresh] = React.useState<string>("");

  const [food, setFood] = React.useState<FoodEntry>({ name: "name", id: "id", slug: "slug", createdAt: new Date() });

  React.useEffect(() => {
    getAllFood();
  }, [createDialogOpen, editDialogOpen, refresh]);

  const getAllFood = async () => {
    try {
      const response = await axios.get("/api/food", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setFoodDb(response.data.foodDb);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFood = async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    try {
      const response = await axios.delete(`/api/food/${id}`);
      forceRefresh(uuidv4());
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenEdit = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, food: FoodEntry) => {
    setFood(food);
    setCreateDialogOpen(false);
    setEditDialogOpen(true);
  };

  return (
    <>
      <AppWindow>
        <WindowHeader active={inactive !== undefined ? false : !createDialogOpen} className="window-header">
          <span>food.exe</span>
          <Button onClick={() => router.push("/")}>
            <span className="close-icon">X</span>
          </Button>
        </WindowHeader>
        <Toolbar>
          <Button variant="menu" size="sm" disabled>
            File
          </Button>
          <Button variant="menu" size="sm" onClick={getAllFood}>
            Refresh
          </Button>
        </Toolbar>
        <WindowContent>
          {foodDb.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell style={{ width: "64px", padding: 0 }}>Edit</TableHeadCell>
                  <TableHeadCell style={{ width: "64px", padding: 0 }}>Delete</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodDb &&
                  foodDb.map((food: FoodEntry) => (
                    <TableRow key={food.slug}>
                      <Link href={`/food/${food.slug}`}>
                        <TableDataCell>{food.name}</TableDataCell>
                      </Link>
                      <TableDataCell style={{ padding: "0" }}>
                        <Button style={{ width: "64px", padding: 0 }} onClick={(e) => handleOpenEdit(e, food)}>
                          Edit
                        </Button>
                      </TableDataCell>
                      <TableDataCell style={{ padding: "0" }}>
                        <Button style={{ width: "64px", padding: 0 }} onClick={(e) => handleDeleteFood(e, food.id)}>
                          Delete
                        </Button>
                      </TableDataCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          <br />
          <Button
            disabled={createDialogOpen}
            onClick={() => {
              setCreateDialogOpen(true);
              setEditDialogOpen(false);
            }}
          >
            Add Food
          </Button>
        </WindowContent>
      </AppWindow>
      {createDialogOpen && <CreateFoodModal setCreateDialogOpen={setCreateDialogOpen} />}
      {editDialogOpen && <EditFoodModal food={food} setEditDialogOpen={setEditDialogOpen} />}
    </>
  );
};

export default FoodApp;

const AppWindow = styled(Window)`
  position: relative;
  width: 80%;
  margin: auto;
`;
