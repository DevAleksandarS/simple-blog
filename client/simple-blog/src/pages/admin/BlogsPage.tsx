import TableComponent from "../../components/TableComponent";

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
  const callback = (page: string | number | undefined) => {
    console.log(page);
  };

  return (
    <>
      <TableComponent
        pagesNumber={3}
        headerRow={HeaderRows}
        tableData={tableData}
        callback={callback}
        isLoading={false}
      ></TableComponent>
    </>
  );
}

export default BlogsPage;
