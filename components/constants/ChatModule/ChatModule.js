import React from 'react'
import { Customheader } from "./Header"
import { CustomSubheader } from "./SubHeader"
import { CustomMessageBox } from "./MessageBox"
import { useSelector } from 'react-redux';
import { BsEmojiAstonishedFill } from "react-icons/bs";

function ChatModule({path}) {
  const { previewData } = useSelector((state) => state.theme);
    const { data, type } = previewData;
  
    if (previewData?.type != path || !previewData) {
      return <div></div>;
    }
    const { header, message, quickReaction, subheader} = data?.customize
    console.log("mm",data)
  return (
    <div className='h-full flex flex-col'>
      {Customheader?.[header]}
      {CustomSubheader?.[subheader]}
      <div
        className=" px-2 flex-1 rounded-md z-10 overflow-y-scroll"
        style={{ color: data?.header?.textColor }}
      >
        {Array(6)
          .fill(5)
          .map((e, i) => {
            return CustomMessageBox?.[message]
          })}
      </div>
      {quickReaction && <div className='flex bg-localColor p-1 w-fit rounded-md ml-3 mt-1'>
        {Array(3).fill(0).map((e) => <BsEmojiAstonishedFill className='mx-1 text-yellow-400' />)}
      </div>}
      <div className='p-1'>
        <input className='bg-activePrimaryBgColor w-full rounded-md placeholder:text-xs  outline-none pl-2 text-sm p-0.5' placeholder='Enter Message' />
      </div>
    </div>
  )
}

export default ChatModule