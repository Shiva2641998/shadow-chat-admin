import axios from 'axios';
import { useSelector } from 'react-redux';

// const baseURL = "http://localhost:8080/api";

const baseURL = 'https://chat-app-backend-2miw.onrender.com/api'

// const axiosRequest = axios.create({
// 	baseURL: baseURL,
// 	timeout: 8000,
// 	headers: {
// 		Accept: 'application/json',
// 		Authorization: `Bearer ${(sessionStorage.getItem("shadow_chat_access_tokken") ?? false)}`
// 	},
// });

const useCreateAxiosInstance = () => {
	const accessToken = useSelector((state) => state.theme.access_token);

	return axios.create({
	  baseURL: baseURL,
	  timeout: 8000,
	  headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${accessToken}`,
	  },
	});
  };
  


export default useCreateAxiosInstance