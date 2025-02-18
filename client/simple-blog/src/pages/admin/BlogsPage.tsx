import { text } from "framer-motion/client";
import TableComponent from "../../components/TableComponent";
import { HeaderRowInterface } from "../../interfaces/TableComponent.interface";

const HeaderRows = [
  {
    text: "Company",
  },
  {
    text: "Contact",
  },
  {
    text: "Country",
  },
];

const tableData = [
  [
    {
      text: "Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste",
    },
    {
      text: "Maria Anders",
    },
    {
      text: "Germany",
    },
  ],
  [
    {
      text: "Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste",
    },
    {
      text: "Maria Anders",
    },
    {
      text: "Germany",
    },
  ],
  [
    {
      text: "Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste",
    },
    {
      text: "Maria Anders",
    },
    {
      text: "Germany",
    },
  ],
  [
    {
      text: "Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste Alfreds Futterkiste",
    },
    {
      text: "Maria Anders",
    },
    {
      text: "Germany",
    },
  ],
];

function BlogsPage() {
  const callback = () => {};

  return (
    <>
      <TableComponent
        numberOfRows={3}
        headerRow={HeaderRows}
        tableData={tableData}
        callback={callback}
      ></TableComponent>
    </>
  );
}

export default BlogsPage;
