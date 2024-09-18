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
import { FaCodePullRequest } from "react-icons/fa6";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function page() {
  const { GET, PUT } = useRequestApiAction();

  const [rowData, setRowData] = useState([]);
  const [updateRowValue, setupdateRowValue] = useState([]);
  const [approveQuizData, setapproveQuizData] = useState(false);
  console.log(approveQuizData, "approveQuizData");
  const handleProcessRowUpdate = (params, index, field, color) => {
    // Update the row data with new color
    setRowData((prevRows) =>
      prevRows.map((row) => {
        if (row.id === params.id) {
          const updatedOptions = row.options.map((option, i) =>
            i === index ? { ...option, [field]: color } : option
          );
          let d = { ...row, options: updatedOptions };
          showInPreview(d);
          // console.log(d,"d:::::")
          return d;
        } else {
          return row;
        }
      })
    );
  };

  const colorPicker = (params, index) => {
    console.log(params.row);
    const info = params.row.options[index];
    const [colorShow, setColorShow] = useState(false);
    return params.row.options[index]?.text ? (
      <>
        <div className="flex items-center flex-col">
          <div className="flex items-center">
          <input
            type="checkbox"
            checked={colorShow}
            onChange={() => {
              setColorShow(!colorShow);
            }}
            className="toggle toggle-sm toggle-primary mr-2"
          />
          <span>Change Color</span>
          </div>
          {colorShow ? (
            <>
              <div
                style={{
                  lineHeight: "10px",
                  // backgroundColor: info && info?.bgColor, color: info && info?.textColor
                }}
                className="w-full flex justify-evenly flex-col items-start"
              >
                <div className="border-2 border-slate-300 mb-2 pt-2 rounded-md w-full">
                  <span className="text-start truncate overflow-hidden text-ellipsis w-full">Bg Color</span>
                  <ColorPickerRenderer
                    className="mt-2"
                    subclassName="w-full"
                    defaultColor={info?.bgColor}
                    params={params}
                    setRowData={setRowData}
                    handleProcessRowUpdate={(pra, color) =>
                      handleProcessRowUpdate(params, index, "bgColor", color)
                    }
                  />
                </div>
                {/* </div> */}
                <div className="border-2 border-slate-300 pt-2 rounded-md w-full">
                  <span>Text Color:</span>
                  <ColorPickerRenderer
                    className="mt-2"
                    defaultColor={info?.textColor}
                    subclassName="w-full"
                    params={params}
                    setRowData={setRowData}
                    handleProcessRowUpdate={(pra, color) =>
                      handleProcessRowUpdate(params, index, "textColor", color)
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <span
            style={{
              lineHeight: "20px",
              height: "100%",
              backgroundColor: info && info?.bgColor, color: info && info?.textColor
            }}
              className="text-center px-1 rounded-md font-bold italic h-full break-words whitespace-normal truncate w-full"
            >
              {params.row.options[index].text}
            </span>
          )}
        </div>
      </>
    ) : (
      <span>----</span>
    );
  };

  const columns = [
    {
      field: "name",
      headerName: "Room Name",
      flex: 1,
      renderCell: (params) => {
        return <span>{params.row.room.name}</span>;
      },
    },
    {
      field: "question",
      headerName: "Question",
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
          <div className="flex justify-center items-center h-full w-full">
            {editImage ? (
              <>
                <input
                  className="h-8 rounded-md outline-none bg-white"
                  onChange={(e) => {
                    setRowData((prevRows) =>
                      prevRows.map((row) => {
                        if (row.id === params.id) {
                          let d = { ...row, bgImage: e.target.value };
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
      field: "Option1",
      headerName: "Option 1",
      editable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return colorPicker(params, 0);
      },
    },
    {
      field: "Option2",
      headerName: "Option 2",
      editable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return colorPicker(params, 1);
      },
    },
    {
      field: "Option3",
      headerName: "Option 3",
      editable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return colorPicker(params, 2);
      },
    },
    {
      field: "Options",
      headerName: "Option 4",
      editable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return colorPicker(params, 3);
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
            <div
              onClick={() => setapproveQuizData(params.row)}
              className="tooltip"
              data-tip="Approve"
            >
              <FaCodePullRequest className="w-5 h-5 mx-2 text-secondaryBgColor" />
            </div>
          </div>
        );
      },
    },
  ];

  const updateRow = async (item) => {
    const { data } = await PUT(`/quiz/updateQuizRow/${item._id}`, item);
    if (data.success) {
      const hasChanged = updateRowValue.filter((row) => row.id !== data.data._id);
      console.log(hasChanged,data)
      setupdateRowValue(hasChanged);
      toast.success("Quiz Updated Successfully!")
    }
  };

  const approveRow = async () => {
    const endTime = document.querySelector("#meeting-time").value;
    console.log(endTime, "endTime");
    const dataRes = { roomId: approveQuizData.room.id, endTime: endTime };
    const { data } = await PUT(`/quiz/${approveQuizData.id}`, dataRes);
    console.log("data.data", data.data);
    if (data.success) {
      setapproveQuizData(false);
    }
  };

  const getRoomList = async () => {
    const { data } = await GET("/quiz");
    console.log("data.data", data.data);
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
          type: "/chat/quiz",
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
      {approveQuizData && (
        <Modal
          open={approveQuizData}
          // onClose={() => setapproveQuizData(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="relative flex flex-col">
              <h3 className="font-bold text-lg mb-4">Quiz Timer!</h3>
              <input
                className="outline-none border-2 rounded-lg border-slate-300 px-3 py-3"
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="btn w-fit bg-localColor hover:bg-localColor text-secondaryBgColor mr-3"
                  onClick={() => setapproveQuizData(false)}
                >
                  Close
                </button>
                <button
                  className="btn w-fit bg-activePrimaryBgColor text-localColor"
                  onClick={approveRow}
                >
                  Approve
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      )}

      <Title title="Quiz" themeView={true} />
      <hr className="my-2 mb-5 text-primaryBgColor" />
      <div
        className="data-grid-container"
        // className={"ag-theme-quartz"}
        // style={{ width: "100%", height: "100%" }}
      >
        <DataGrid
          className="dataGridTable overflow-scroll"
          rows={rowData}
          // rowHeight={200}
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
          componentsProps={{
            virtualScroller: {
              style: { overflow: "auto" }, // Customize scroller styles
            },
          }}
          sx={{
            "& .MuiDataGrid-row": {
              minHeight: "200px !important", // Apply a minimum height to each cell
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              minHeight: "200px", // Apply a minimum height to each cell
            },
            "& .MuiDataGrid-cell": {
              overflow: "visible",
              minHeight: "200px",
            },
            "& .MuiDataGrid-virtualScroller": {
              overflow: "visible",
              minHeight: "200px",
            },
            "& .MuiDataGrid-virtualScrollerRenderZone": {
              overflow: "visible",
              minHeight: "200px",
            },
            "& .MuiDataGrid-main": {
              overflow: "visible",
              minHeight: "200px",
            },
          }}
        />
      </div>
    </div>
  );
}

export default page;
