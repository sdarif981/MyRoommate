// utils/datauri.js
import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname);
  return parser.format(extName, file.buffer); // returns { content: "data:image/png;base64,..." }
};

export default getDataUri;
