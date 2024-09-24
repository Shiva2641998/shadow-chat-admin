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
  const [addRawData, setaddRawData] = useState({
    name: "",
    description: "",
  });

  const getSlot = async () => {
    const { data } = await GET("/slot");
    setslotList(
      data.data.map((item) => ({
        id: item._id, // Map _id to id
        ...item,
      }))
    );
  };

  console.log(rowData, "rowData adv", slotList);

  useEffect(() => {
    getSlot();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      editable: true,
      flex: 1,
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

  const updateRow = async (item) => {
    const { data } = await PUT(`/slot/${item._id}`, {
      selectedSlots: item.selectedSlots,
    });
    if (data.success) {
      const hasChanged = updateRowValue.filter(
        (row) => row.id !== data.data._id
      );
      console.log(hasChanged, data);
      setupdateRowValue(hasChanged);
      getSlot()
      toast.success("Advertiesment Updated Successfully!");
    }
  };

  const handleAddRow = (e) => {
    setaddRawData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addSlotRow = async () => {
    const { data } = await POST(`/slot`, addRawData);
    if (data.success) {
      setaddRow(false);
      setaddRawData({});
      getSlot()
      toast.success("Slot Added Successfully!");
    }
  };

  const handleProcessRowUpdate = (updatedRow, originalRow) => {
    const newRows = [...rowData];
    const idx = newRows.findIndex((x) => x.id === originalRow.id);
    setupdateRowValue((prev) => [...prev, updatedRow]);
    newRows[idx] = updatedRow;
    setRowData(newRows);
  
    return updatedRow;
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
                onClick={addSlotRow}
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <Title title="Slot" />
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
          rows={slotList}
          columns={columns}
          disableColumnMenu
          processRowUpdate={handleProcessRowUpdate}
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
