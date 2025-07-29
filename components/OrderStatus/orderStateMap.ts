export const orderStateMap = {
  created: {
    message: "Order Placed",
    fulfillment_state: "Pending",
  },
  accepted: {
    message: "Order Confirmed",
    fulfillment_state: "Pending",
  },
  "in-progress": {
    message: "In Progress",
    fulfillment_states: {
      packed: {
        message: "Packed for shipping",
      },
      agent_assigned: {
        message: "Rider assigned",
      },
      "out-for-pickup": {
        message: "Out for Pickup",
      },
      "pickup-failed": {
        message: "Pickup Failed",
      },
      "order-picked-up": {
        message: "Order Picked Up",
      },
      "in-transit": {
        message: "In Transit",
      },
      "at-destination-hub": {
        message: "At Destination Hub",
      },
      "out-for-delivery": {
        message: "Out for Delivery",
      },
      "delivery-failed": {
        message: "Delivery Failed",
      },
    },
  },
  completed: {
    message: "Order Delivered",
    fulfillment_state: "Order-delivered",
  },
  // "cancelled": {
  //   message: "Order Cancelled",
  //   fulfillment_state: "Cancelled",
  // },
};
