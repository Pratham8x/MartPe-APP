import { create } from "zustand";

interface DeliveryDetail {
  addressId: string | null;
  city?: string | null;
  state?: string | null;
  fullAddress: string | null;
  name?: string | null;
  isDefault?: boolean | null;
  pincode?: string | null;
  lat?: number | null;
  lng?: number | null;
  streetName?: string | null;
}

interface DeliveryState {
  selectedDetails: DeliveryDetail;
}

interface DeliveryActions {
  addDeliveryDetail: (detail: DeliveryDetail) => void;
}

type DeliveryStore = DeliveryState & DeliveryActions;

const useDeliveryStore = create<DeliveryStore>((set) => ({
  selectedDetails: {} as DeliveryDetail,

  addDeliveryDetail: (detail: DeliveryDetail) => {
    set({ selectedDetails: detail });
  },
}));

export default useDeliveryStore;
