'use client'
import React, { useEffect, useState } from 'react'
import { useRequestApiAction } from '../../../axios/requests/useRequestApiAction';
import { useAppDispatch } from '../../../store/store';
import Title from '../../../components/Title/Title';
import { DataGrid } from '@mui/x-data-grid';
import ColorPickerRenderer from '../../../components/color/ColorPickerRenderer';
import { setPreviewDataInfo } from '../../../store/themeSlice';
import { IoSave } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { FaBan, FaEyeSlash } from 'react-icons/fa6';
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { toast } from 'react-toastify';

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
    const { GET, PUT, POST } = useRequestApiAction();

    const [rowData, setRowData] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [updateRowValue, setupdateRowValue] = useState([]);
    const dispatch = useAppDispatch();
    const [banMsg, setbanMsg] = useState({})
    const [timerModal, settimerModal] = useState(false)
  
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

    const HideMessage = async (val) => {
      console.log(val,"val")
      const item = {
        roomId: val.room,
        messageId: val.id
      }
      const { data } = await POST(`/chat/hide`, item);
      console.log(data,"data")
      if(data.success){
        toast.success("Message Hide Successfully!")
        }
    };

    const HideBanMessage = async () => {
      const item = {
        roomId: banMsg.room,
        messageId: banMsg.id,
        userId: banMsg.sender._id,
        endTime: document.querySelector("#meeting-time").value
      }
      const { data } = await POST(`/chat/hide/ban`, item);
      console.log(data,"data")
      if(data.success){
        toast.success(data.message)
        settimerModal(false)
        }
    };

  
    const columns = [
      { field: "Creater", headerName: "Creater", flex: 1,renderCell: (params) => {
        return <span className='capitalize'>{params.row?.sender?.userName}</span>
      } },
      { field: "content", headerName: "Content", flex: 1 },
      { field: "Status", headerName: "Status",  align: "center",
      headerAlign: "center", flex: 1 , renderCell: (params) => {
        return params.row?.hashtagStatus ? <div className="badge !badge-error !text-white">Hide</div> : <div className="badge !badge-success !text-white">Show</div>
      }},
      { field: "Message", headerName: "Reported count",  align: "center",
      headerAlign: "center", flex: 1 , renderCell: (params) => {
        return <span>{params.row?.reportedBy?.length}</span>
      }},
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
              {/* {hasChanged?.length > 0 && ( */}
                <div
                  // onClick={() => updateRow(params.row)}
                  className="tooltip cursor-pointer mx-3"
                  data-tip="Hide"
                >
                  <FaEyeSlash onClick={() => HideMessage(params.row)} className="w-5 h-5 text-secondaryBgColor" />
                </div>
                <div
                  // onClick={() => updateRow(params.row)}
                  className="tooltip cursor-pointer mx-3"
                  data-tip="Hide & Ban"
                  onClick={() => {
                    setbanMsg(params.row)
                    settimerModal(true)
                  }}
                >
                  <FaBan className="w-4 h-4 text-secondaryBgColor" />
                </div>
              {/* )} */}
              <div
                //   onClick={() => updateRow(params.row)}
                  className="tooltip cursor-pointer hover:bg-localColor mx-3"
                  data-tip="Delete"
                >
              <MdDelete className="w-5 h-5 text-red-400" />
              </div>
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
      // delete item['messages']
      const {userName, firstName, lastName, image, password} = item
      const { data } = await PUT(`/users/${item._id}`, {userName, firstName, lastName, image, password});
      if (data.success) {
        const hasChanged = updateRowValue.filter((row) => row.id !== data.data._id);
        console.log(hasChanged,data)
        setupdateRowValue(hasChanged);
        toast.success("User Updated Successfully!")
  
      }
      // setRowData(
      //   data.data.map((item) => ({
      //     id: item._id, // Map _id to id
      //     ...item,
      //   }))
      // );
    };
  
    const getReportList = async (id) => {
      const { data } = await GET(`/rooms/messages/${id}?status=true`);
      console.log(data,"data")
      if(data.success){
        setRowData(
          data.data.messages.map((item) => ({
            id: item._id, // Map _id to id
            ...item,
          }))
          );
        }
    };

    const getRoomList = async () => {
      const { data } = await GET("/rooms");
      setRoomList(
        data.data.map((item) => ({
          id: item._id, // Map _id to id
          ...item,
        }))
      );
      if(data.data?.length > 0)
      getReportList(data.data[0]?._id)
    };
  
  
    const showInPreview = (data) => {
      if (data) {
        console.log(data, "data");
        setupdateRowValue((prev) => [...prev, data]);
        // dispatch(
        //   setPreviewDataInfo({
        //     type: "/chat/rooms",
        //     data,
        //   })
        // );
      }
    };
  
    useEffect(() => {
        getRoomList();
    }, []);
  
    return (
      <div className="h-full ">
        {timerModal && (
        <Modal
          open={timerModal}
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
                  onClick={() => settimerModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn w-fit bg-activePrimaryBgColor text-localColor"
                  onClick={HideBanMessage}
                >
                  Hide & Ban
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
        <Title title="Report Messages" themeView={false} />
        <hr className="my-2 mb-5 text-primaryBgColor" />
        <div className='my-4'>
            <div>
            <select className="select bg-white" defaultValue={roomList?.[0]?.name} onChange={(e) => getReportList(e.target.value)}>
                {roomList.map((e) => <option value={e._id}>{e.name}</option>)}
            </select>
            </div>
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
                  pageSize: 10,
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

export default page