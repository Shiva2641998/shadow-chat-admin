import React from 'react'
import { useSelector } from 'react-redux';

function ChatBubble({ path }) {
    const { previewData } = useSelector((state) => state.theme);
    const { data, type } = previewData;
  
    if (previewData?.type != path || !previewData) {
      return <div></div>;
    }
    const { bubble } = data;

  return (
    <div
    className='w-10 h-10 p-2 absolute bottom-5 right-3 shadow-lg shadow-black'
    style={{
        borderRadius:"20px 20px 0px 20px",
        background: `linear-gradient(to right, ${bubble?.backgroundColor}, ${bubble?.textColor})`,
        // backgroundColor: bubble?.backgroundColor,
        // color: bubble?.textColor,
      }}
    ><img src={bubble.icon} /></div>
  )
}

export default ChatBubble