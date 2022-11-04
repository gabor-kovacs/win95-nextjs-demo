import { v4 as uuidv4 } from "uuid";

const generateSlug: (str: string) => string = (str) => {
  const id = str
    ?.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    ?.join("_");
  return id ?? uuidv4();
};

export default generateSlug;
