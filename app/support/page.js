"use client"
import React, { useEffect, useState, useTransition } from 'react'
import Title from '../../components/Title/Title'
import { useRequestApiAction } from '../../axios/requests/useRequestApiAction';
import { toast } from 'react-toastify';

function page() {
    const { GET, PUT } = useRequestApiAction();
  const [themeInfo, setthemeInfo] = useState({})
  const { Other } = themeInfo ?? {};
  const [isPending, startTransition] = useTransition(); 

  const getThemeUI = async () => {
    const { data } = await GET("/theme");
    if(data.success){
      setthemeInfo(data.data[0])
    }
  };
console.log(Other,"other")
  const applyTheme = () => {
    startTransition(async() => {
      const { data } = await PUT(`/theme/${themeInfo?._id}`, themeInfo);
      if(data.success){
        // setthemeInfo(data.data[0])
        toast.success("Apply Changes")
      }
    })
  }

  const handleChange = (key, val) => {
    setthemeInfo((prev) => {
      let newData =  {
        ...prev,
        Other : {
          ...prev?.Other,
            [key]: val
        }
      }
    //   dispatch(
    //     setPreviewDataInfo({
    //       type: "/chat/bubble",
    //       data: newData,
    //     })
    //   );
      return newData
    })
  }

  useEffect(() => {
    getThemeUI()
  }, [])

  return (
    <div>
        <Title title={'Support'} />
        <hr className="my-2 mb-5 text-primaryBgColor" />
        <div className='grid grid-cols-1 gap-5'>
            <div>
                <p className='text-md font-bold'>Support Email</p>
                <input type='text' value={Other?.supportEmail} placeholder='Enter Email' className='p-2 outline-none w-1/3 bg-localColor rounded-md mt-2 text-activePrimaryBgColor' onChange={(e) => handleChange('supportEmail', e.target.value)} />
            </div>

            <div>
                <p className='text-md font-bold'>Chat Rule</p>
                <textarea
                 value={Other?.chatrule} 
                placeholder="Bio"
                className="textarea textarea-bordered mt-2 textarea-lg w-1/3 !p-2 bg-localColor outline-none ring-0 text-activePrimaryBgColor" style={{height: "400px"}}
                onChange={(e) => handleChange('chatrule', e.target.value)}
                ></textarea>
            </div>

            <div className="flex">
                <button onClick={applyTheme} disabled={isPending} className="bg-activePrimaryBgColor text-localColor px-4 py-2 rounded-lg">
                    {isPending ? 'Submitting...' : 'Save Changes'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default page