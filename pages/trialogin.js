// DataPage.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

function DataPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: fetchedData, mutate } = useSWR(
    "https://gp-backend-u5ty.onrender.com/api/mentorData/"
  );

  useEffect(() => {
    console.log("fetchedData", fetchedData);
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const fetchMoreData = async (startIndex, stopIndex) => {
    try {
      // Fetch additional data for the given range
      const response = await fetch(
        `https://gp-backend-u5ty.onrender.com/api/mentorData/?startIndex=${startIndex}&stopIndex=${stopIndex}`
      );
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const isRowLoaded = ({ index }) => index < data.length;

  const loadMoreRows = ({ startIndex, stopIndex }) =>
    fetchMoreData(startIndex, stopIndex);

  const Row = ({ index, style }) => {
    if (!data[index]) {
      return null;
    }

    const rowData = data[index];

    return (
      <tr
        key={rowData._id}
        className={index % 2 === 0 ? "bg-black bg-opacity-20" : ""}
        style={style}
      >
        {/* Render table cells with mentor data */}
      </tr>
    );
  };

  return (
    <>
      <div className="flex flex-col w-[80vw] h-[85vh] mt-6">
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isRowLoaded}
              loadMoreItems={loadMoreRows}
              itemCount={data.length + 1}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  height={height}
                  itemCount={data.length + 1}
                  itemSize={50}
                  width={width}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {({ index, style }) => {
                    if (index === 0) {
                      // Render header row
                      return (
                        <>
                          <div className="flex flex-col items-center  bg-gray-700 w-screen min-h-screen  mt-0 zIndex-2">
                            <h1 className=" text-white text-4xl font-'Roboto Slab' mt-3">
                              <b>Mentor Data </b>
                            </h1>
                            <div className="flex flex-col w-[80vw] h-[85vh]  mt-6 ">
                              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                  <div className="shadow-2xl overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full text-sm text-white sm:table">
                                      <thead
                                        className="bg-gray-800 text-sm uppercase font-Damion-cursive"
                                        style={{
                                          position: "sticky",
                                          top: "0",
                                          zIndex: "2",
                                        }}
                                      >
                                        <tr>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left tracking-wider"
                                          >
                                            No.
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left tracking-wider"
                                          >
                                            Mentor Name
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left tracking-wider"
                                          >
                                            Total Students Guided
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left tracking-wider"
                                          >
                                            No.of Ongoing Students
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left tracking-wider"
                                          >
                                            Current Availability
                                          </th>
                                        </tr>
                                      </thead>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                    return Row({ index: index - 1, style });
                  }}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
      {/* ... (same as before) */}
    </>
  );
}

export default DataPage;
