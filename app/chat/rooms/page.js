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
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import FontFamily from "../../../components/FontFamily/FontFamily"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function page() {
  const { GET, PUT, POST } = useRequestApiAction();

  const [rowData, setRowData] = useState([]);
  const [updateRowValue, setupdateRowValue] = useState([]);
  const [addRow, setaddRow] = useState(false);
  const [addRawData, setaddRawData] = useState({
    name: "",
    description: "",
  });

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
      renderCell: (params) => {
        return <p className="overflow-hidden truncate">{params.value}</p>
      }
    },
    {
      field: "image",
      headerName: "Logo",
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
      field: "fontFamily",
      headerName: "Font Family",
      editable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <FontFamily
            className="h-full"
            value={params?.row?.fontFamily}
            onFontChange={(e) => handleProcessRowUpdate(params, e)}
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
                className="tooltip cursor-pointer "
                data-tip="Save"
              >
                <IoSave className="w-5 h-5 text-activePrimaryBgColor" />
              </div>
            )}
            <div
                //   onClick={() => updateRow(params.row)}
                  className="tooltip cursor-pointer hover:bg-localColor ml-2"
                  data-tip="Delete"
                >
              <MdDelete className="w-5 h-5 text-red-400" />
              </div>
          </div>
        );
      },
    },
  ];
  console.log(rowData)
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

  const addRoomRow = async () => {
    const { data } = await POST(`/rooms/rooms`, addRawData);
    if (data.success) {
      setaddRow(false);
      setaddRawData({});
      getRoomList()
      toast.success("Room Added Successfully!");
    }
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

  const handleAddRow = (e) => {
    setaddRawData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="h-full ">

      <Modal
        open={addRow}
        // onClose={() => setapproveQuizData(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="relative flex flex-col">
            <h3 className="font-bold text-2xl mb-4">Add</h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                className="outline-none border-2 rounded-lg bg-localColor border-slate-300 px-3 py-3"
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleAddRow}
              />

              <input
                className="outline-none border-2 rounded-lg bg-localColor border-slate-300 px-3 py-3"
                type="text"
                placeholder="Enter Description"
                name="description"
                onChange={handleAddRow}
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="w-fit px-4 rounded-lg py-3 bg-localColor hover:bg-localColor text-secondaryBgColor mr-3"
                onClick={() => setaddRow(false)}
              >
                Close
              </button>
              <button
                className="w-fit px-4 rounded-lg py-3 bg-activePrimaryBgColor text-localColor"
                onClick={addRoomRow}
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Title title="Room" themeView={true} />
      <hr className="my-2 mb-5 text-primaryBgColor" />
      <div className="flex justify-end pb-5">
        <button
          onClick={() => setaddRow(true)}
          className="flex bg-activePrimaryBgColor text-localColor items-center px-4 py-2 rounded-lg active:bg-localColor select-none"
        >
          <IoMdAdd className="mr-2" />
          Add
        </button>
      </div>
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


