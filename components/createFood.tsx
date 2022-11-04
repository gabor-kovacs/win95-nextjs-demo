import React from "react";
import styled from "styled-components";
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Frame,
  TextInput,
  GroupBox,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
  NumberInput,
} from "react95";
import { useRouter } from "next/router";
import axios from "axios";

interface Props {
  setCreateDialogOpen: React.SetStateAction<any>;
}
const CreateFood: React.FC<Props> = (props) => {
  const router = useRouter();
  const { setCreateDialogOpen } = props;

  const [name, setName] = React.useState<string>("");
  const [details, setDetails] = React.useState<FoodEntryDetails>({});

  const [detailName, setDetailName] = React.useState<string>("");
  const [detailAmount, setDetailAmount] = React.useState<number>(0);
  const [detailUnit, setDetailUnit] = React.useState<string>("");

  const [info, setInfo] = React.useState<string>("");

  const handleAddDetail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!detailName) {
      setInfo("Detail name is required!");
      return;
    }
    if (detailAmount <= 0) {
      setInfo("Detail amount is required!");
      return;
    }
    if (!detailUnit) {
      setInfo("Detail unit is required!");
      return;
    }
    const newDetails = { ...details, [detailName]: { unit: detailUnit, amount: detailAmount } };
    setInfo("");
    setDetails(newDetails);
  };

  const handleAddFood = async () => {
    if (!name) {
      setInfo("Food name is required!");
      return;
    }
    const newFood = { name, details };
    try {
      const response = await axios.post("/api/food", newFood, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setInfo("");
      setCreateDialogOpen(false);
      router.push("/food");
    } catch (error) {}
  };

  const handleDeleteDetail = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) => {
    const newDetails = Object.fromEntries(Object.entries(details).filter(([key]) => key !== name));
    setDetails(newDetails);
  };

  return (
    <CreateFoodWindow>
      <WindowHeader className="window-header">
        <span>Add food</span>
        <Button onClick={() => setCreateDialogOpen(false)}>
          <span className="close-icon">X</span>
        </Button>
      </WindowHeader>
      <WindowContent>
        Name:
        <TextInput
          required
          name="name"
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <br />
        <GroupBox label="Details">
          {Object.keys(details).length > 0 && (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Amount</TableHeadCell>
                    <TableHeadCell>Unit</TableHeadCell>
                    <TableHeadCell>Delete</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(details).map((detail, idx) => (
                    <TableRow key={idx}>
                      <TableDataCell>{detail}</TableDataCell>
                      <TableDataCell style={{ width: "80px" }}>{details[detail]["amount"]}</TableDataCell>
                      <TableDataCell style={{ width: "50px" }}>{details[detail]["unit"]}</TableDataCell>
                      <TableDataCell style={{ width: "50px", padding: 0 }}>
                        <Button onClick={(e) => handleDeleteDetail(e, detail)}>Delete</Button>
                      </TableDataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <br />
            </>
          )}
          <form onSubmit={handleAddDetail}>
            <DetailsWrapper>
              <Button type="submit">Add Detail</Button>
              <div>
                <p>Name:</p>
                <TextInput
                  required
                  name="detailName"
                  type="text"
                  value={detailName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDetailName(e.target.value);
                  }}
                />
              </div>
              <div>
                <p>Amount:</p>
                <NumberInput
                  defaultValue={detailAmount}
                  onChange={(e) => {
                    setDetailAmount(e);
                  }}
                />
              </div>
              <div>
                <p>Unit:</p>
                <TextInput
                  required
                  name="detailUnit"
                  type="text"
                  value={detailUnit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDetailUnit(e.target.value);
                  }}
                />
              </div>
            </DetailsWrapper>
          </form>
        </GroupBox>
        <br />
        <Button onClick={handleAddFood}>Add Food</Button>
      </WindowContent>
      {info && (
        <Frame variant="well" style={{ width: "100%", padding: "0 8px", color: "red" }}>
          {info}
        </Frame>
      )}
    </CreateFoodWindow>
  );
};

export default CreateFood;

const CreateFoodWindow = styled(Window)`
  position: fixed;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DetailsWrapper = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-end;
  column-gap: 8px;
  grid-template-columns: 100px 1fr 120px 60px;
  & > div {
    display: inline-block;
  }
`;
