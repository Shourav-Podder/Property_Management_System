import axios from 'axios';

import {
  BASE_URL,
  propertyUpdateAPI,
} from '@/constants/routeConstant';
// import { ISellerPropertyToSell } from './userInterface';



// Function to get and update property
const handleGetAndUpdateSellerProperty = async ( updatedData: object) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
    });

    try {
        const updateResponse = await axiosInstance.put(`${propertyUpdateAPI}`, updatedData);
        console.log(updatedData)
        console.log(updateResponse);
        return updateResponse.data;
    } catch (error) {
        console.error('Error updating property:', error);
    }
};






export const LawerAPI = {
    handleGetAndUpdateSellerProperty
}
