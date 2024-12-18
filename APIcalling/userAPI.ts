import axios from 'axios';

import {
  BASE_URL,
  userEmailVerification,
  userLogin,
  userRegistration
} from '@/constants/routeConstant';
import { IUserData, IUserLoginData } from './userInterface';

// Creating user to the database 
const handleCreateuserToDB = async (data: IUserData) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(userRegistration, data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};


const handleUserLogin = async (data: IUserLoginData) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(userLogin, data);
    return response.data;
  } catch (error) {
    console.error('Error login user:', error);
  }
}


const handleUserUpdate = async (id: string, data: IUserData) => {
  console.log('Initiating user update...');
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  try {
    const response = await axiosInstance.put(`/user/update-user/${id}`, data);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error during user update:', error);
    throw error;
  }
};




const handleUserEmailVerification = async (email: string) => {
  console.log('result')
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(userEmailVerification, { email });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error email verification:', error);
  }
}

export const UserAPI = {
  handleCreateuserToDB,
  handleUserLogin,
  handleUserEmailVerification,
  handleUserUpdate
}
