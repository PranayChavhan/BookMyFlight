/* eslint-disable no-useless-catch */

import axiosClient from "./axios";

export async function getRequest(URL) {
  try {
    const response = await axiosClient.get(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRequestJson(URL, queryParams = {}) {
  try {
    const query = new URLSearchParams(queryParams); 
    const updatedURL = `${URL}?${query.toString()}`;

    const response = await axiosClient.get(updatedURL);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function postRequest(URL, payload, queryParams = {}) {
  try {
    const query = new URLSearchParams(queryParams); 
    const updatedURL = `${URL}?token=${query.toString()}`;

    const response = await axiosClient.post(updatedURL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postRequestNoToken(URL) {
  try {

    const response = await axiosClient.post(URL);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postRequestJson(URL, payload) {
  try {
    const response = await axiosClient.post(URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}



export async function patchRequest(URL, payload, queryParams = {}) {
  try {
    const query = new URLSearchParams(queryParams); 
    const updatedURL = `${URL}?token=${query.toString()}`;
    
    const response = await axiosClient.patch(updatedURL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function deleteRequest(URL) {
  try {
    const response = await axiosClient.delete(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}
