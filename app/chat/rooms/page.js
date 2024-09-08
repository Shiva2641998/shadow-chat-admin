"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import Title from ".././../../components/Title/Title";
import { useRequestApiAction } from "../../../axios/requests/useRequestApiAction";

function page() {

  const {GET} = useRequestApiAction();

  const [rowData, setRowData] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "name", filter: true },
    { field: "description" },
    { field: "primaryBgColor" },
    { field: "primaryTextColor" },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  const getRoomList = async() =>{
    const { data } = await GET("/rooms");
    console.log(data)
    setRowData(data.data);
  }

  useEffect(() => {
    getRoomList()
  }, [])
  

  return (
    <div className="h-full">
      <Title title="Room" themeView={true} />
      <hr className="my-2 mb-5 text-primaryBgColor" />
      <div
        className={"ag-theme-quartz-auto-dark"}
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}

export default page;
