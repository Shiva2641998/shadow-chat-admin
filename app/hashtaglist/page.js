'use client'
import React, { useEffect, useState } from 'react'
import { useRequestApiAction } from '../../axios/requests/useRequestApiAction';
import { useAppDispatch } from '../../store/store';
import Title from '../../components/Title/Title';
import { DataGrid } from '@mui/x-data-grid';
import ColorPickerRenderer from '../../components/color/ColorPickerRenderer';
import { setPreviewDataInfo } from '../../store/themeSlice';
import { IoSave } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

function page() {
    const { GET, PUT } = useRequestApiAction();

    const [rowData, setRowData] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [updateRowValue, setupdateRowValue] = useState([]);
    const dispatch = useAppDispatch();
  
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
      { field: "Creater", headerName: "Creater", flex: 1,renderCell: (params) => {
        return <span className='capitalize'>{params.row?.sender?.userName}</span>
      } },
      { field: "content", headerName: "Content", flex: 1 },
      { field: "Status", headerName: "Status",  align: "center",
      headerAlign: "center", flex: 1 , renderCell: (params) => {
        return params.row?.hashtagStatus ? <div className="badge !badge-success !text-white">Active</div> : <div className="badge !badge-error !text-white">Expire</div>
      }},
      { field: "Message", headerName: "Message count",  align: "center",
      headerAlign: "center", flex: 1 , renderCell: (params) => {
        return <span>{params.row?.messages?.length}</span>
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
                //   onClick={() => updateRow(params.row)}
                  className="tooltip cursor-pointer hover:bg-localColor"
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
  
    const getHashtagList = async (id) => {
      const { data } = await GET(`/hashtag/rid=${id}`);
      setRowData(
        data.data.map((item) => ({
          id: item._id, // Map _id to id
          ...item,
        }))
      );
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
      getHashtagList(data.data[0]?._id)
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
        <Title title="Hashtag" themeView={false} />
        <hr className="my-2 mb-5 text-primaryBgColor" />
        <div className='my-4'>
            <div>
            <select className="select bg-white" defaultValue={roomList?.[0]?.name} onChange={(e) => getHashtagList(e.target.value)}>
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