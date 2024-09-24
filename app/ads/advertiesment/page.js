"use client";
import React, { useEffect, useState } from "react";
import Title from "../../../components/Title/Title";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { IoSave } from "react-icons/io5";
import Multiselect from "multiselect-react-dropdown";
import { useRequestApiAction } from "../../../axios/requests/useRequestApiAction";
import { IoMdAdd } from "react-icons/io";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

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
  const [slotList, setslotList] = useState([]);
  const [updateRowValue, setupdateRowValue] = useState([]);
  const [addRow, setaddRow] = useState(false);
  const [addAdvertiesmentData, setaddAdvertiesmentData] = useState({
    name:"",
    description:"",
    imageUrl:"",
    endTime:"",
    selectedSlots:[]
  })

  const getSlot = async () => {
    const { data } = await GET("/slot");
    setslotList(
      data.data.map((item) => ({
        id: item._id, // Map _id to id
        ...item,
      }))
    );
  };

  const getAdvList = async () => {
    const { data } = await GET("/advertisements");
    setRowData(
      data.data.map((item) => ({
        id: item._id, // Map _id to id
        ...item,
      }))
    );
  };

  console.log(rowData, "rowData adv", slotList);

  useEffect(() => {
    getSlot();
    getAdvList();
  }, []);

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
      field: "imageUrl",
      headerName: "Image",
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
      field: "selectedSlots",
      headerName: "Slot",
      editable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        const list = params.value.filter((e) => slotList.filter((item) => item?._id == e._id))
        return (
          <div className="flex justify-center items-center h-full w-full multiSelect">
            <Multiselect
              options={slotList} 
              selectedValues={list}
              displayValue="name" // Property name to display in the dropdown options
              onSelect={(e) => {
                setRowData((prevRows) =>
                  prevRows.map((row) => {
                    if (row.id === params.id) {
                      let d = { ...row, [params.field]: e };
                      showInPreview(d);
                      return d;
                    } else {
                      return row;
                    }
                  })
                );
              }}
            />
          </div>
        );
      },
    },
    {
      field: "endTime",
      headerName: "End Time",
      editable: false,
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        console.log(params);
        const formatDateTimeLocal = (date) => {
          if (!date) return ""; // Handle null or undefined values
          const d = new Date(date);
          return d.toISOString().slice(0, 16); // Get 'YYYY-MM-DDTHH:MM' format
        };
        return (
          <div className="flex justify-center items-center h-full w-full multiSelect">
            <input
              className="outline-none bg-transparent rounded-lg  px-2"
              type="datetime-local"
              id="meeting-time"
              name="meeting-time"
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
              }}
              defaultValue={formatDateTimeLocal(params.row.endTime)}
            />
          </div>
        );
      },
    },
    // {
    //   field: "primaryBgColor",
    //   headerName: "Primary Bg Color",
    //   editable: false,
    //   align: "center",
    //   headerAlign: "center",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <ColorPickerRenderer
    //       className="h-full"
    //         params={params}
    //         setRowData={setRowData}
    //         handleProcessRowUpdate={handleProcessRowUpdate}
    //       />
    //     );
    //   },
    // },
    // {
    //   field: "primaryTextColor",
    //   headerName: "Primary Text Color",
    //   editable: false,
    //   align: "center",
    //   headerAlign: "center",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <ColorPickerRenderer
    //         className="h-full"
    //         params={params}
    //         setRowData={setRowData}
    //         handleProcessRowUpdate={handleProcessRowUpdate}
    //       />
    //     );
    //   },
    // },

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

  const updateRow = async (item) => {
    const { data } = await PUT(`/advertisements/${item._id}`, {
      selectedSlots: item.selectedSlots.map((e) => {
        return {_id: e._id, name: e.name}
      }),
    });
    if (data.success) {
      const hasChanged = updateRowValue.filter(
        (row) => row.id !== data.data._id
      );
      console.log(hasChanged, data);
      setupdateRowValue(hasChanged);
      toast.success("Advertiesment Updated Successfully!");
    }
  };

  const showInPreview = (data) => {
    if (data) {
      console.log(data, "data");
      setupdateRowValue((prev) => [...prev, data]);
    }
  };

  const handleAddRow = (e) =>{
    setaddAdvertiesmentData((prev) => {
      return {...prev,[e.target.name]: e.target.value}
    })
  }

  const addAdvertiesmentRow = async () => {
    const { data } = await POST(`/advertisements`, addAdvertiesmentData);
    if (data.success) {
      setaddRow(false)
      setaddAdvertiesmentData({})
      getAdvList()
      toast.success("Advertiesment Added Successfully!");
    }
  };

  return (
    <div>
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

              <input
                className="outline-none border-2 col-span-2 rounded-lg bg-localColor border-slate-300 px-3 py-3"
                type="text"
                placeholder="Image url"
                name="imageUrl"
                onChange={handleAddRow}
              />

              <div className="border-2 bg-localColor border-gray-300 rounded-lg h-full multiSelect">
              <Multiselect
              options={slotList}
              className="h-full"
              displayValue="name" // Property name to display in the dropdown options
              onSelect={(e) => {
                setaddAdvertiesmentData((prevRows) =>{
                  return { ...prevRows, selectedSlots: e };
                })
              }}
            />
            </div>

              <input
                className="outline-none border-2 rounded-lg bg-localColor border-slate-300 px-3 py-3"
                type="datetime-local"
                id="meeting-time"
                placeholder="end Time"
                name="endTime"
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
                onClick={addAdvertiesmentRow}
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <Title title="Advertiesment" />
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
      <div>
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
