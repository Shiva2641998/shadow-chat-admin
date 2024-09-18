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
import { IoSave } from "react-icons/io5";
import { toast } from "react-toastify";

function page() {
  const { GET, PUT } = useRequestApiAction();

  const [rowData, setRowData] = useState([]);
  const [updateRowValue, setupdateRowValue] = useState([]);

  const handleProcessRowUpdate = (params, color) => {
    // Update the row data with new color
    setRowData((prevRows) =>
      prevRows.map((row) => {
        if (row.id === params.id) {
          let d = { ...row, [params.field]: color };
          showInPreview(d);
          return d;
        } else {
          return row;
        }
      })
    );
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
      align: "center",
      headerAlign: "center",
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
                      prevRows.map((row) => {
                        if (row.id === params.id) {
                          let d = { ...row, [params.field]: e.target.value };
                          showInPreview(d);
                          return d;
                        } else {
                          return row;
                        }
                      })
                    );
                    setEditImage(false);
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
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <ColorPickerRenderer
          className="h-full"
            params={params}
            setRowData={setRowData}
            handleProcessRowUpdate={handleProcessRowUpdate}
          />
        );
      },
    },
    {
      field: "primaryTextColor",
      headerName: "Primary Text Color",
      editable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <ColorPickerRenderer
            className="h-full"
            params={params}
            setRowData={setRowData}
            handleProcessRowUpdate={handleProcessRowUpdate}
          />
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const hasChanged = updateRowValue.filter((row) => row.id === params.id);
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {hasChanged?.length > 0 && (
              <div
                onClick={() => updateRow(params.row)}
                className="tooltip cursor-pointer"
                data-tip="Save"
              >
                <IoSave className="w-5 h-5 text-activePrimaryBgColor" />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const removeKey = (obj, keyToRemove) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => key !== keyToRemove)
    );

  const updateRow = async (item) => {
    const newObj = removeKey(item, "messages");
    console.log("item", newObj);
    // delete item['messages']
    const { data } = await PUT(`/rooms/updateRow/${item._id}`, newObj);
    if (data.success) {
      const hasChanged = updateRowValue.filter((row) => row.id !== data.data._id);
      console.log(hasChanged,data)
      setupdateRowValue(hasChanged);
      toast.success("Room Updated Successfully!")

    }
    // setRowData(
    //   data.data.map((item) => ({
    //     id: item._id, // Map _id to id
    //     ...item,
    //   }))
    // );
  };

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
      setupdateRowValue((prev) => [...prev, data]);
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
    <div className="h-full ">
      <Title title="Room" themeView={true} />
      <hr className="my-2 mb-5 text-primaryBgColor" />
      <div
      // className={"ag-theme-quartz"}
      // style={{ width: "100%", height: "100%" }}
      >
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
          // processRowUpdate={handleProcessRowUpdate}
          sx={{
            "& .MuiDataGrid-cell": {
              overflow: "visible",
            },
            "& .MuiDataGrid-virtualScroller": {
              overflow: "visible",
            },
            "& .MuiDataGrid-virtualScrollerRenderZone": {
              overflow: "visible",
            },
            "& .MuiDataGrid-main": {
              overflow: "visible",
            },
          }}
        />
      </div>
    </div>
  );
}

export default page;
