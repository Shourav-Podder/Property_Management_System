import axios from 'axios';

import {
  BASE_URL,
  propertyCheckoutAPI,
  propertySellingAPI
} from '@/constants/routeConstant';
import { ISellerPropertyToSell } from './userInterface';

// Creating user to the database 
const handleCreateSellerPropertyToDB = async (data: ISellerPropertyToSell) => {
    console.log(data)
  const axiosInstance = axios.create({
      baseURL: BASE_URL
    });
  try {
    const response = await axiosInstance.post(propertySellingAPI, data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};


// Getting the data...
const handleGetSellerPropertiesFromDB = async () => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
    });
    try {
        // Make a GET request using the property ID
        const response = await axiosInstance.get(`${propertyCheckoutAPI}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching property:', error);
    }
};





export const SellerAPI = {
    handleCreateSellerPropertyToDB,
    handleGetSellerPropertiesFromDB
}
