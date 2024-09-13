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




function page() {
  const { GET } = useRequestApiAction();

  const [rowData, setRowData] = useState([]);
  const [updateRowValue, setupdateRowValue] = useState([])

  const handleProcessRowUpdate = (params, index, field, color) => {
    // Update the row data with new color
    console.log(params,"params::")
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

  console.log(rowData,"rowData")

  const columns = [
    { field: "name", headerName: "Room Name", flex: 1,
    renderCell: (params) => {
      return <span>{params.row.room.name}</span>
    }
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
      align: 'center',
      headerAlign: 'center',
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
                      prevRows.map((row) =>{
                        if(row.id === params.id){
                          let d = { ...row, bgImage: e.target.value };
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
      field: "Option1",
      headerName: "Option1 / Bg / Text color",
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center">
            <span>{params.row.options[0].text}</span>
            <div className="px-2">
            <ColorPickerRenderer
              params={params}
              setRowData={setRowData}
              handleProcessRowUpdate={(pra, color) => handleProcessRowUpdate(params, 0, 'bgColor',color)}
              />
            </div>
            <ColorPickerRenderer
              params={params}
              setRowData={setRowData}
              handleProcessRowUpdate={(pra, color) => handleProcessRowUpdate(params, 0, 'textColor',color)}
              />
          </div>
        );
      },
    },
    {
      field: "Option2",
      headerName: "Option2 / Bg / Text color",
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center">
            <span>{params.row.options[1].text}</span>
            <div className="px-2">
             <ColorPickerRenderer
              params={params}
              setRowData={setRowData}
              handleProcessRowUpdate={(pra, color) => handleProcessRowUpdate(params, 1, 'bgColor',color)}
              />
            </div>
            <ColorPickerRenderer
              params={params}
              setRowData={setRowData}
              handleProcessRowUpdate={(pra, color) => handleProcessRowUpdate(params, 1, 'textColor',color)}
              />
          </div>
        );
      },
    },
    {
      field: "Option3",
      headerName: "Option3 / Bg / Text color",
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center">
            <span>{params.row.options[2]?.text ?? "---"}</span>
            {params.row.options[2]?.text && <><div className="px-2">
             <ColorPickerRenderer
              params={params}
              setRowData={setRowData}
              handleProcessRowUpdate={(pra, color) => handleProcessRowUpdate(params, 2, 'bgColor',color)}
              />
            </div>
            <ColorPickerRenderer
              params={params}
              setRowData={setRowData}
              handleProcessRowUpdate={(pra, color) => handleProcessRowUpdate(params, 2, 'textColor',color)}
              /></>}
          </div>
        );
      },
    },
    {
      field: "Options",
      headerName: "Option4 / Bg / Text color",
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center">
            <span>{params.row.options[3]?.text ?? "---"}</span>
            {params.row.options[3]?.text && <><div className="px-2">
             <ColorPickerRenderer
              params={params}
              setRowData={setRowData}
              handleProcessRowUpdate={(pra, color) => handleProcessRowUpdate(params, 3, 'bgColor',color)}
              />
            </div>
            <ColorPickerRenderer
              params={params}
              setRowData={setRowData}
              handleProcessRowUpdate={(pra, color) => handleProcessRowUpdate(params, 3, 'textColor',color)}
              /></>}
          </div>
        );
      },
    },
    

    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const hasChanged = updateRowValue.filter((row) => row.id === params.id);
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: "100%" }}>
         {hasChanged?.length > 0 && <div onClick={() => updateRow(hasChanged)} className="tooltip" data-tip="Save">
              <IoSave className="w-5 h-5 text-activePrimaryBgColor" />
          </div>}
          <div onClick={()=>document.getElementById('my_modal_2').showModal()} className="tooltip" data-tip="Approve">
              <FaCodePullRequest className="w-5 h-5 mx-2 text-secondaryBgColor" />
          </div>
        </div>
}
    },
  ];

  const updateRow = async (data) => {
    // const { data } = await GET("/rooms");
    // setRowData(
    //   data.data.map((item) => ({
    //     id: item._id, // Map _id to id
    //     ...item,
    //   }))
    // );
  };

  const approveRow = async (data) => {
    
  };

  const getRoomList = async () => {
    const { data } = await GET("/quiz");
    console.log("data.data",data.data)
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
      setupdateRowValue((prev) => [...prev,data])
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
      <dialog id="my_modal_2" className="modal approveTimeQuiz">
  <div className="modal-box relative flex flex-col">
    <h3 className="font-bold text-lg mb-4">Quiz Timer!</h3>
    <input
    className="outline-none border-2 rounded-lg border-slate-300 px-3 py-3"
  type="datetime-local"
  id="meeting-time"
  name="meeting-time"
  value="2018-06-12T19:30"
  min="2018-06-07T00:00"
  max="2018-06-14T00:00" />
  <div className="flex justify-end mt-4">
  <button className="btn w-fit btn-primary" onClick={approveRow}>Approve</button>
  </div>
  </div>
  {/* <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form> */}
</dialog>
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
              style: { overflow: 'auto' }, // Customize scroller styles
            },
          }}
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
