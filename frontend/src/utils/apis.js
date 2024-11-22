import axiosInstance from "./axiosInstance";

export const GET = async (endpoint, params) => {
  return axiosInstance
    .get(endpoint, { params })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const POST = async (endpoint, payload) => {
  return axiosInstance
    .post(endpoint, payload)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const PUT = async (endpoint, payload) => {
  return axiosInstance
    .put(endpoint, payload)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const DELETE = async (endpoint, params) => {
  return axiosInstance
    .delete(endpoint, { params })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
