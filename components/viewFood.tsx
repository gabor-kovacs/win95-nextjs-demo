import React from "react";
import styled from "styled-components";
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
  GroupBox,
} from "react95";

import { useRouter } from "next/router";

interface Props {
  foodInfo: FoodEntry;
}

const ViewFood: React.FC<Props> = ({ foodInfo }) => {
  const router = useRouter();

  return (
    <>
      <ViewFoodWindow>
        <WindowHeader active={true} className="window-header">
          <span>{foodInfo?.slug}.txt</span>
          <Button onClick={() => router.push("/food")}>
            <span className="close-icon">X</span>
          </Button>
        </WindowHeader>
        <WindowContent>
          <h1>Name: {foodInfo?.name}</h1>
          <br />
          {foodInfo?.details && Object.keys(foodInfo?.details).length > 0 && (
            <GroupBox label="Details">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Amount</TableHeadCell>
                    <TableHeadCell>Unit</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(foodInfo.details).map((detail, idx) => (
                    <TableRow key={idx}>
                      <TableDataCell>{detail}</TableDataCell>
                      <TableDataCell style={{ width: "80px" }}>
                        {foodInfo?.details && foodInfo.details[detail]["amount"]}
                      </TableDataCell>
                      <TableDataCell style={{ width: "50px" }}>
                        {foodInfo?.details && foodInfo.details[detail]["unit"]}
                      </TableDataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <br />
            </GroupBox>
          )}
        </WindowContent>
      </ViewFoodWindow>
    </>
  );
};

export default ViewFood;

const ViewFoodWindow = styled(Window)`
  position: fixed;
  min-width: 50%;
  margin: auto;
`;
