import { getAllAddresses } from "../../gql/api/user";
import getCityInfo from "../../constants/cityCode";
import { get } from "http";
type AddDeliveryDetailCallback = (address: Address) => void;

export const initAddress = async (
  addDeliveryDetailCallback: AddDeliveryDetailCallback
) => {
  try {
    const response = await getAllAddresses();

    response?.getAllAddresses?.find((address) => {
      if (address.isDefault) {
        addDeliveryDetailCallback({
          id: address?.id,
          city: address?.city,
          state: address?.state,
          pincode: address?.pincode,
          fullAddress: `${address?.address?.line1}, ${address?.city}, ${address?.state}, ${address?.pincode}`,
          name: address?.name,
          isDefault: address?.isDefault,
          lat: address?.geoLocation?.lat,
          lng: address?.geoLocation?.lng,
          cityCode: getCityInfo(address?.city).Code,
        });
      } else {
        console.log("addresses", address);
      }
    });
  } catch (error) {
    console.error("Error fetching all addresses:", error);
  }
};
