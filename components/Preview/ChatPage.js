import React from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import { RiHashtag } from "react-icons/ri";
import { IoGameController } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useSelector } from 'react-redux';


const imgURL = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' 

function ChatPage({path}) {
const {data, type} =  useSelector((state) => state.theme.previewData);
console.log(data,"data")
const bgColor = data?.primaryBgColor || "#000"
const TextColor = data?.primaryTextColor || "#fff"


  if(type != path){
    return <div></div>
  }

  return (
    <div className='flex flex-col h-full rounded-md' style={{backgroundColor: "#fff", color:TextColor, padding: "11px 4px"}}>
      <div className='header flex justify-between items-center px-1 rounded-md mb-1' style={{backgroundColor: bgColor, color:TextColor}}>
        <RiMenu2Fill />
        <p>Chat Page</p>
        <FaUser />
      </div>
      <div className='header flex justify-end items-center p-1 rounded-md mb-1' style={{backgroundColor: bgColor, color:TextColor}}>
        <IoIosPause className='mx-1' />
        <RiHashtag className='mx-1' />
        <IoGameController className='mx-1' />
      </div>
      <div className='header flex justify-end items-center px-1 rounded-md mb-1' style={{backgroundColor: bgColor, color:TextColor}}>
        <p className='flex-1'>{data.name}</p>
        <FaChevronDown />
      </div>
      <div className='my-1 px-2 flex-1 rounded-md' style={{ color:TextColor}}>
        {
          Array(4).fill(5).map((e,i) =>{
            if(i %2 == 0){
              return <div className='flex items-end justify-end mb-2'>
              <div className='chat-bubble' style={{backgroundColor: TextColor, color:bgColor}}>
                <span style={{fontSize: 10}}>this is a Message</span>
              </div>
              <img src={imgURL} className='w-5 h-5 rounded-full' />
            </div>
            }
            return <div className='flex items-end mb-2' >
                <img src={imgURL} className='w-5 h-5 rounded-full' />
                <div className='chat-bubble' style={{backgroundColor: bgColor, color: TextColor}}>
                  <span style={{fontSize: 10}}>this is a Message</span>
                </div>
              </div>
          })
        }
      </div>
      <div className='flex items-center rounded-md' style={{backgroundColor: bgColor, color:TextColor}}>
        <input className='w-full bg-transparent' placeholder='Type anything' />
        <IoIosSend className='w-3 h-3' />
      </div>
    </div>
  )
}

export default ChatPage