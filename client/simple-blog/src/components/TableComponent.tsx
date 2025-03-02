import { TableComponentPropsInterface } from "../interfaces/TableComponent.interface";
import "../styles/TableComponent.css";
import { Pagination, Skeleton } from "@nextui-org/react";

function TableComponent({
  pagesNumber,
  headerRow,
  tableData,
  isLoading,
  callback,
}: TableComponentPropsInterface) {
  const getSkeleton = () => {
    return Array.from({ length: 10 }).map(() => {
      return (
        <tr>
          {headerRow.map((_, index) => {
            return (
              <td
                className={`p-4 group-hover:bg-zinc-900 ${
                  index == 0
                    ? "rounded-l-xl"
                    : index == headerRow.length - 1
                    ? "rounded-r-xl"
                    : ""
                }`}
              >
                <Skeleton
                  className="max-w-80 w-auto rounded-xl h-6"
                  classNames={{
                    base: "bg-zinc-900 before:opacity-10",
                  }}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <>
      {/* TABLE */}
      <div className="w-full p-2 rounded-xl border border-zinc-700 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {headerRow.map((el, index) => {
                return (
                  <th
                    className={`text-left p-4 bg-zinc-800 ${
                      index == 0
                        ? "rounded-l-xl"
                        : index == headerRow.length - 1
                        ? "rounded-r-xl"
                        : ""
                    }`}
                  >
                    {el.text}
                  </th>
                );
              })}
            </tr>
          </thead>

          <div className="h-2"></div>

          <tbody>
            {isLoading
              ? getSkeleton()
              : tableData.map((row) => {
                  return (
                    <tr className="group">
                      {row.map((el, index) => {
                        return (
                          <td
                            className={`p-4 group-hover:bg-zinc-900 ${
                              index == 0
                                ? "rounded-l-xl"
                                : index == headerRow.length - 1
                                ? "rounded-r-xl"
                                : ""
                            }`}
                          >
                            <div className="max-w-80 truncate">{el.text}</div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {/* PAGINATION */}
      <div className="flex justify-end mt-3">
        <Pagination
          color="primary"
          isCompact
          showControls
          initialPage={1}
          total={pagesNumber}
          onChange={callback}
          classNames={{
            item: "bg-zinc-900 text-white active:bg-zinc-900 data-[hover=true]:[&:not(data-[active=true])]:bg-zinc-800",
            prev: "bg-zinc-900 text-white data-[hover=true]:[&:not(data-[active=true])]:bg-zinc-800",
            next: "bg-zinc-900 text-white data-[hover=true]:[&:not(data-[active=true])]:bg-zinc-800",
          }}
        />
      </div>
    </>
  );
}

export default TableComponent;
