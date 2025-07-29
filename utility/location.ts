import axios from "axios";

export const getAddress = async (latitude: number, longitude: number) => {
  try {
    const apiKey = "t7wBcKS6d2rJ9ZLDFCZt4rGOwBhqP_9QFJE8rfxuVdk";
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${apiKey}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Error while calling revgeocode api:", error);
  }
};

export const getAddressOpenStreetMap = async (
  latitude: number,
  longitude: number
) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Error while calling the open street map api:", error);
  }
};
