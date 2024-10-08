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
    try {
      const res = await axiosInstance.post(path, data);
      return res;
    } catch (error) {
      console.log("err:", error)
    }
  };

  const PUT = async (path, data) => {
    const res = await axiosInstance.put(path, data);
    return res;
  };

  const PATCH = async (path, data) => {
    const res = await axiosInstance.patch(path, data);
    return res;
  };

  return { GET, POST, PUT, PATCH }
}
