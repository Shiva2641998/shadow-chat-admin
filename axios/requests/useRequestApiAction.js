// import { axiosRequest } from "..";


// import { axiosRequest } from "..";



import React from 'react'
import useCreateAxiosInstance from "..";

export function useRequestApiAction() {
  const axiosInstance = useCreateAxiosInstance();

  const GET = async (path) => {
    const res = await axiosInstance.get(path);
    return res;
  };
  
  const POST = async (path, data) => {
    const res = await axiosInstance.post(path, data);
    return res;
  };

  return { GET, POST }
}
