import useDeliveryStore from "../state/deliveryAddressStore";

const getLatLongFromGlobalState = () => {
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);

  const { lat, lng } = selectedDetails;

  return { lat, lng };
};

export default getLatLongFromGlobalState;
