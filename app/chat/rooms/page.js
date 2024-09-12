"use client";
import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import Title from ".././../../components/Title/Title";
import ColorPickerRenderer from ".././../../components/color/ColorPickerRenderer";
import { useRequestApiAction } from "../../../axios/requests/useRequestApiAction";
import { useDispatch } from "react-redux";
import { setPreviewDataInfo } from "../../../store/themeSlice";
import { useAppDispatch } from "../../../store/store";
import { DataGrid } from "@mui/x-data-grid";
import { SketchPicker } from "react-color";

function page() {
  const { GET } = useRequestApiAction();

  const [rowData, setRowData] = useState([]);
  const [updateButtonShow, setupdateButtonShow] = useState(true);

  const handleProcessRowUpdate = (newRow) => {
    // Update the row data with new color
    console.log(newRow, "newRow");
    setRowData((prevRows) =>
      prevRows.map((row) =>
        row.id === newRow.id ? { ...row, color: newRow.color } : row
      )
    );
    return newRow; // Return the updated row
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "bgImage",
      headerName: "Bg Image",
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        const [editImage, setEditImage] = useState(false);
        return (
          <div className="flex justify-center items-center h-full">
            {editImage ? (
              <>
                <input
                className="h-8 rounded-md outline-none bg-white"
                  onChange={(e) => {
                    setRowData((prevRows) =>
                      prevRows.map((row) =>{
                        if(row.id === params.id){
                          let d = { ...row, [params.field]: e.target.value };
                          showInPreview(d)
                          return d
                        }else{
                          return row
                        }
                      }
                      )
                    );
                    setEditImage(false)
                  }}
                />
              </>
            ) : (
              <>
                <img
                  src={params.value}
                  className="w-10 h-10 rounded-lg"
                  onClick={() => setEditImage(true)}
                />
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "primaryBgColor",
      headerName: "Primary Bg Color",
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <ColorPickerRenderer
            params={params}
            setRowData={setRowData}
            showInPreview={showInPreview}
          />
        );
      },
    },
    {
      field: "primaryTextColor",
      headerName: "Primary Text Color",
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <ColorPickerRenderer
            params={params}
            setRowData={setRowData}
            showInPreview={showInPreview}
          />
        );
      },
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
  ];

  const getRoomList = async () => {
    const { data } = await GET("/rooms");
    setRowData(
      data.data.map((item) => ({
        id: item._id, // Map _id to id
        ...item,
      }))
    );
  };

  const dispatch = useAppDispatch();

  const showInPreview = (data) => {
    if (data) {
      console.log(data, "data");
      setupdateButtonShow(true);
      dispatch(
        setPreviewDataInfo({
          type: "/chat/rooms",
          data,
        })
      );
    }
  };

  useEffect(() => {
    getRoomList();
  }, []);

  return (
    <div className="h-full">
      <Title title="Room" themeView={true} />
      <hr className="my-2 mb-5 text-primaryBgColor" />
      <div
      // className={"ag-theme-quartz"}
      // style={{ width: "100%", height: "100%" }}
      >
        {updateButtonShow && (
          <div className="flex justify-end">
            <button className="bg-activePrimaryBgColor text-primaryBgColor px-5 py-2 text-sm active:bg-white select-none cursor-pointer rounded-md mb-3">
              Update
            </button>
          </div>
        )}
        <DataGrid
        className="dataGridTable"
          rows={rowData}
          columns={columns}
          disableColumnMenu
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          processRowUpdate={handleProcessRowUpdate}
          sx={{
            '& .MuiDataGrid-cell': {
              overflow: 'visible',
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'visible',
            },
            '& .MuiDataGrid-virtualScrollerRenderZone': {
              overflow: 'visible',
            },
            '& .MuiDataGrid-main': {
              overflow: 'visible',
            },
          }}
        />
      </div>
    </div>
  );
}

export default page;
