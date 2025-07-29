import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorageItem = async (itemName: string) => {
  try {
    const userDetails = await AsyncStorage.getItem(itemName);
    return userDetails;
  } catch (error) {
    console.error(`Unable to fetch async storage item[${itemName}]: ${error}`);
  }
};

export const setAsyncStorageItem = async (
  itemName: string,
  itemValue: string
) => {
  try {
    const response = await AsyncStorage.setItem(itemName, itemValue);
    return response;
  } catch (error) {
    console.error(`Unable to set async storage item[${itemName}]: ${error}`);
  }
};

export const removeAsyncStorageItem = async (itemName: string) => {
  try {
    const response = await AsyncStorage.removeItem(itemName);
    return response;
  } catch (error) {
    console.error(`Unable to remove async storage item[${itemName}]: ${error}`);
  }
};
