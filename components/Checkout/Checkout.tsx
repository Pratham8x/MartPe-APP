import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useCartStore } from "../../state/useCartStore";
import { BillSummary } from "./BillSummary";
import { YourDetails } from "./YourDetails";
import { CancellationPolicy } from "./CancellationPolicy";
import { BackArrow } from "../../constants/icons/commonIcons";
import { router } from "expo-router";
import SlideToUnlock from 'react-native-slide-to-unlock';
import { getUserDetails } from "../../hook/useUserDetails";
import {
  selectResponseMessageT,
  selectCallUserMessageT,
  userDetailsT,
  breakupT,
} from "./types";
import { RetailsErrorCode } from "./retailsErrorCode";
import { DotIndicator } from "react-native-indicators";
import useDeliveryStore from "../../state/deliveryAddressStore";
import { getDistance } from "geolib";
import axios from "axios";
import RazorpayCheckout from "react-native-razorpay";
import { initOrder } from "../../state/state-init/init-order";
import { AntDesign } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

const select_ws_url = "wss://api-sandbox.martpe.in/api/v1/user/select";
const razorpayKeyId = "rzp_test_28OLg2dI6uOgm3";
const init_ws_url = "wss://api-sandbox.martpe.in/api/v1/user/init";
const confirm_ws_url = "wss://api-sandbox.martpe.in/api/v1/user/confirm";
const create_order_url = `https://api-sandbox.martpe.in/api/v1/user/payment/create_order`;

const Checkout = ({ id }) => {
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [onSelectData, setonSelectData] = useState<
    selectResponseMessageT["data"] | null
  >(null);
  const [userDetails, setUserDetails] = useState<userDetailsT | null>(null);
  const { allCarts } = useCartStore();
  const { store, items } = allCarts.find((cart) => cart.id === id);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [breakup, setBreakup] = useState<breakupT | null>(null);
  const [updatedItems, setUpdatedItems] = useState([]);
  const [savings, setSavings] = useState(0);
  const [enablePayment, setEnablePayment] = useState(true);
  //for checking if all items are cancellable and displaying the cancellation policy accordingly
  const cancellable = items.every(
    (item) => item.details.meta.ondc_org_cancellable === true
  );

  //for getting store dist and time
  const distance = Number(
    (
      getDistance(
        {
          latitude: store?.geoLocation?.lat,
          longitude: store?.geoLocation?.lng,
        },
        { latitude: selectedDetails?.lat, longitude: selectedDetails?.lng }
      ) / 1000
    ).toFixed(1)
  );

  //for rendering the right arrow icon in the slide button
  const renderIcon = useCallback(() => {
    return <AntDesign name="right" size={25} color={"#14a16d"} />;
  }, []);

  //for handling the select call as soon as the checkout page is loaded
  const handleSelect = async (userId) => {
    try {
      // const { userId } = userDetails;

      const { city, state, addressId } = selectedDetails;

      const selectcallBody: selectCallUserMessageT = {
        context: {
          city: city,
          state: state,
        },
        message: {
          userId: userId,
          cartId: id,
          fulfillmentAddressId: addressId,
        },
      };
      console.log("inside handleSelect - selectcallBody: ", selectcallBody);
      const ws = new WebSocket(select_ws_url);
      console.log("inside handleSelect web socket");
      ws.onopen = () => {
        console.log("Connection Established!");
        ws.send(JSON.stringify(selectcallBody));
      };

      ws.onmessage = (event: WebSocketMessageEvent) => {
        const response: selectResponseMessageT = JSON.parse(event.data);
        console.log("select response", response);
        if (
          response.data &&
          response.data.context.action &&
          response.data.context.action === "on_select"
        ) {
          setonSelectData(response.data);
          setGrandTotal(response?.data?.message?.order?.quote?.price?.value);
          setIsLoading(false);
          if (response.data.error) {
            Dialog.show({
              closeOnOverlayTap: false,
              type: ALERT_TYPE.DANGER,
              title: "Unable to complete your purchase",
              button: "Cancel",
              textBody: `${RetailsErrorCode[response.data.error.code]}`,
              onPressButton: () => {
                router.back();
              },
            });
          }
          console.log(
            "inside handleSelect web socket onmessage",
            response.data
          );

          ws.close();
        }

        if (response.error) {
          Dialog.show({
            closeOnOverlayTap: false,
            type: ALERT_TYPE.DANGER,
            title: "Unable to complete your purchase",
            button: "Cancel",
            textBody: `${response.error}`,
            onPressButton: () => {
              router.back();
            },
          });

          ws.close();
        }
      };

      ws.onclose = () => {
        console.log("Connection Closed!");
        setIsLoading(false);
      };

      ws.onerror = (e: any) => {
        console.log("WS Error", e);
        Dialog.show({
          closeOnOverlayTap: false,
          type: ALERT_TYPE.DANGER,
          title: "We're sorry",
          textBody: "Your order could not be processed.",
          button: "Cancel",
          onPressButton: () => {
            router.back();
          },
        });
        ws.close();
      };
    } catch (error) {
      console.log(error);
    }
  };

  //for comparing the old items with the new items from onSelect data and updating the items accordingly
  const compareAndUpdateItems = (oldItems, newItems) => {
    let newsavings = 0;
    setEnablePayment(true);
    const updatedItems = oldItems.map((oldItem) => {
      const newItem = newItems.find(
        (item) => item.id === oldItem.details.catalog_id
      );
      if (newItem) {
        newsavings +=
          (oldItem.details.price.maximum_value - newItem.price) *
          newItem.quantity;
        const updatedItem = {
          ...oldItem,
          quantity: newItem.quantity,
          details: {
            ...oldItem.details,
            price: { ...oldItem.details.price, value: newItem.price },
          },
          maxQuantity: newItem.maxQuantity,
          log: [],
          available: true,
        };
        // Compare and update price
        if (oldItem.details.price.value !== parseInt(newItem.price)) {
          updatedItem.log.push(
            `* Price updated from ₹${Number(oldItem.details.price.value)
              .toFixed(2)
              .replace(/\.?0+$/, "")} to ₹${Number(newItem.price)
              .toFixed(2)
              .replace(/\.?0+$/, "")}`
          );
        }
        // Compare and update quantity
        if (oldItem.quantity !== newItem.quantity) {
          updatedItem.log.push(
            `* Quantity updated from ${oldItem.quantity} to ${newItem.quantity}`
          );
        }
        return updatedItem;
      } else {
        newsavings +=
          (oldItem.details.price.maximum_value - oldItem.details.price.value) *
          oldItem.quantity;
        setEnablePayment(false);
        return {
          ...oldItem,
          available: false,
          maxQuantity: Math.min(
            oldItem.details.quantity.maximum.count,
            oldItem.details.quantity.available.count
          ),
          log: ["Unavaliable"],
        };
      }
    });
    setSavings(newsavings);
    setUpdatedItems(updatedItems);
  };

  //for initializing the order after payment button is pressed
  const handleInit = async () => {
    try {
      setIsLoading(true);
      const initcallbody = {
        context: {
          onselectId: onSelectData?.id,
        },
        message: {
          userId: (userDetails as { userId: string | undefined })?.userId,
          deliveryAddressId: selectedDetails?.addressId,
          // billingAddressId: "...",
        },
      };
      const ws = new WebSocket(init_ws_url);

      ws.onopen = () => {
        console.log("Connection Established (inside init)!");
        ws.send(JSON.stringify(initcallbody));
      };

      ws.onmessage = (event: WebSocketMessageEvent) => {
        const response = JSON.parse(event.data);
        console.log("web socket payment message", response);

        // if we get an error field inside init response, then we need to close the ws and show the error
        if (response.error) {
          setIsLoading(false);
          Dialog.show({
            closeOnOverlayTap: false,
            type: ALERT_TYPE.DANGER,
            title: "We're sorry",
            textBody: "Your order could not be processed.",
            button: "Cancel",
            onPressButton: () => {
              router.back();
            },
          });

          console.log("web socket init response error", response.error);
          ws.close();
        } else if (response?.data?.context?.action === "on_init") {
          console.log("recieved init data", response?.data);
          setIsLoading(false);
          ws.close();
          if (response?.data?.id) createOrder(response?.data?.id);
          // TODO: remove these alerts in production
          else
            Dialog.show({
              closeOnOverlayTap: false,
              type: ALERT_TYPE.DANGER,
              title: "We're sorry",
              textBody: "Your order could not be processed.",
              button: "Cancel",
              onPressButton: () => {
                router.back();
              },
            });
        }
      };

      ws.onclose = () => {
        setIsLoading(false);
        console.log("Connection Closed!");
      };

      ws.onerror = (e: any) => {
        console.log("WS Error", e);
        setIsLoading(false);
        Dialog.show({
          closeOnOverlayTap: false,
          type: ALERT_TYPE.DANGER,
          title: "We're sorry",
          textBody: "Your order could not be processed.",
          button: "Cancel",
          onPressButton: () => {
            router.back();
          },
        });
        ws.close();
      };
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Dialog.show({
        closeOnOverlayTap: false,
        type: ALERT_TYPE.DANGER,
        title: "We're sorry",
        textBody: "Your order could not be processed.",
        button: "Cancel",
        onPressButton: () => {
          router.back();
        },
      });
    }
  };

  //for creating the order after init is successful
  const createOrder = async (initId) => {
    try {
      const response = await axios.post(
        create_order_url,
        {
          cartId: id,
          oninitId: initId,
          deliveryAddressId: selectedDetails?.addressId, // same as deliveryaddressid from init call
          // billingAddressId: "...",
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("order api response", response);
      // setOrderId(response.data.id);
      console.log("Order ID:", response?.data?.id);

      if (response?.data?.id) {
        const PG_options = {
          description: `Razorpay Payment for order ${response?.data?.id}`,
          image: "https://i.imgur.com/n5tjHFD.png",
          currency: "INR",
          key: razorpayKeyId,
          amount: grandTotal * 100,
          name: "test order",
          order_id: response?.data?.id,
          prefill: {
            email: userDetails?.email,
            contact: userDetails?.phoneNumber,
            name: `${userDetails?.firstName} ${userDetails?.lastName}`,
          },
          theme: { color: "#00BC66" },
        };

        // redirect to payment gateway, if order creation is successful
        // razorpay handles all payment gateway related errors, and if payment is successful, then it will call handleConfirm
        RazorpayCheckout.open(PG_options)
          .then((data: { razorpay_payment_id: string }) => {
            Dialog.show({
              closeOnOverlayTap: false,
              type: ALERT_TYPE.SUCCESS,
              title: "Payment successful!",
              textBody: `Your payment ID is ${data.razorpay_payment_id}.`,
            });
            handleConfirm(initId);
          })
          //
          .catch((error) => {
            console.trace(error);
            Dialog.show({
              closeOnOverlayTap: false,
              type: ALERT_TYPE.DANGER,
              title: "Couldn't process payment!",
              button: "Cancel",
              textBody: `Please try again later.`,
              onPressButton: () => {
                router.back();
              },
            });
          });
      }
    } catch (error) {
      console.log("Error:", error.message);
      Dialog.show({
        closeOnOverlayTap: false,
        type: ALERT_TYPE.DANGER,
        title: "We're sorry",
        textBody: "Your order could not be processed.",
        button: "Cancel",
        onPressButton: () => {
          router.back();
        },
      });
      // Alert.alert("Order Creation failed", `${error.message}`, [
      //   {
      //     text: "Cancel",
      //     style: "cancel",
      //     onPress: () => {
      //       router.back();
      //     },
      //   },
      // ]);
    }
  };

  // const distance = Number(
  //   (
  //     getDistance(
  //       {
  //         latitude: store?.geoLocation?.lat,
  //         longitude: store?.geoLocation?.lng,
  //       },
  //       { latitude: selectedDetails?.lat, longitude: selectedDetails?.lng }
  //     ) / 1000
  //   ).toFixed(1)
  // );

  //for confirming the order after payment is successful
  const handleConfirm = async (initId) => {
    try {
      setIsConfirming(true);
      console.log("Payment to martpe successful");
      console.log("Wait for seller to confirm order");
      console.log(
        "If seller cancels the order, then your amount will be refunded"
      );
      const confirmcallbody = {
        context: {
          oninitId: initId,
        },
        message: {
          userId: userDetails?.userId,
        },
      };
      const ws = new WebSocket(confirm_ws_url);

      ws.onopen = () => {
        console.log("Connection Established!");
        ws.send(JSON.stringify(confirmcallbody));
      };

      ws.onmessage = (event: WebSocketMessageEvent) => {
        const response = JSON.parse(event.data);
        console.log("confirm success", response);
        if (response?.data?.orderId) {
          console.log("confirm response", response.data);
          const orderId = response?.data?.orderId;
          Dialog.show({
            closeOnOverlayTap: false,
            type: ALERT_TYPE.SUCCESS,
            title: "Order placed successfully!",
            textBody: `We're excited to get it to you. Click here to view and track your order.`,
            button: "View",
            onPressButton: () => {
              router.push({
                pathname: "../(tabs)/orders/[order]",
                params: { id: orderId },
              });
            },
          });
          setIsConfirming(false);
          ws.close();
          initOrder();
        }

        if (response.error) {
          setIsConfirming(false);
          ws.close();
          Dialog.show({
            closeOnOverlayTap: false,
            type: ALERT_TYPE.DANGER,
            title: "Seller confirmation pending! ",
            textBody:
              "We haven't received confirmation from the seller about your order yet. We'll notify you as soon as we do.",
            button: "ok",
            onPressButton: () => {
              router.back();
            },
          });
        }
      };
      ws.onclose = () => {
        setIsConfirming(false);
        console.log("Connection Closed!");
      };
      ws.onerror = (e: any) => {
        console.log("WS Error", e);
        setIsConfirming(false);

        ws.close();
      };
    } catch (error) {
      console.log(error);
      Dialog.show({
        closeOnOverlayTap: false,
        type: ALERT_TYPE.DANGER,
        title: "Couldn't reach server!",
        textBody: "Please try again later..",
        button: "Cancel",
        onPressButton: () => {
          router.back();
        },
      });
    }
  };

  // calling the select call as soon as the checkout page is loaded
  useEffect(() => {
    const selectCall = async () => {
      const userDetails = await getUserDetails();
      const userDetailsParsed = JSON.parse(userDetails);
      setUserDetails(userDetailsParsed);
      await handleSelect(userDetailsParsed.userId);
    };

    if (selectedDetails?.addressId) {
      selectCall();
    } else {
      Dialog.show({
        closeOnOverlayTap: false,
        type: ALERT_TYPE.WARNING,
        title: "No Address Selected",
        button: "ok",
        textBody: "Please select a delivery address",
        onPressButton: () => {
          router.push("../address/SavedAddresses");
        },
      });
    }
  }, [selectedDetails]);

  //for comparing the old items with the new items from onSelect data and updating the items accordingly
  //for updating the items total and breakup after onSelect data is recieved
  //for setting the grand total and savings after onSelect data is recieved
  useEffect(() => {
    let newItems: {
      id: string;
      price: number;
      quantity: number;
      maxQuantity: number;
    }[] = [];
    let delivery = 0;
    let packing = 0;
    let convenience = 0;
    let discount = 0;
    let tax = 0;
    let newItemTotal = 0;

    onSelectData?.message?.order?.quote?.breakup?.map((item) => {
      if (item.type === "delivery") {
        delivery = Number(item?.price?.value);
      }
      if (item.type === "packing") {
        packing = Number(item?.price?.value);
      }
      if (item.type === "misc") {
        convenience = Number(item?.price?.value);
      }
      if (item.type === "discount") {
        discount = Number(item?.price?.value);
      }
      if (item.type === "tax") {
        tax = Number(item?.price?.value);
      }
      if (item.type === "item") {
        let updatedItem = {
          id: item.id,
          price: Number(item.details.price.value) / Number(item.quantity.count),
          quantity: item.quantity.count,
          maxQuantity: Math.min(
            item.details.quantity.maximum.count,
            item.details.quantity.available.count
          ),
        };
        console.log("updatedItem", updatedItem);

        newItems.push(updatedItem);
        newItemTotal +=
          Number(updatedItem.price) * Number(updatedItem.quantity);
      }
    });
    console.log("onSelectData", JSON.stringify(onSelectData));
    const newbreakup = {
      delivery,
      packing,
      convenience,
      discount,
      tax,
    };
    compareAndUpdateItems(items, newItems);
    setItemsTotal(newItemTotal);
    setBreakup(newbreakup);
  }, [onSelectData]);

  return (
    <View style={styles.container}>
      <View style={styles.sellerInfoContainer}>
        <TouchableOpacity style={styles.backIcon}>
          <BackArrow
            onPress={() => {
              router.back();
            }}
          />
        </TouchableOpacity>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: store.descriptor.symbol }}
            style={styles.sellerLogo}
          />
        </View>
        <View style={styles.sellerInfo}>
          <View style={styles.line}>
            <Text style={styles.sellerName}>{store.descriptor.name}</Text>
          </View>
          <View style={styles.line}>
            <Text style={{ fontSize: 12, color: "#666" }}>
              {store.address.street}
            </Text>
          </View>
          <View style={styles.line}>
            <Text>{distance} Km </Text>
            <Image source={require("../../assets/dot.png")} />
            <Text style={{ color: "green" }}>
              {((distance / 35).toFixed(0) === "0"
                ? (distance / 35) * 60
                : distance / 35
              ).toFixed(0)}{" "}
              {(distance / 35).toFixed(0) === "0" ? "min" : "hr"}
            </Text>
            <Image source={require("../../assets/time-green.png")} />
          </View>
        </View>
      </View>

      {isLoading || isConfirming ? (
        <View style={styles.loadingContainer}>
          {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>Contacting the seller..</Text>
          </View> */}
          <DotIndicator color="black" size={8} />
        </View>
      ) : onSelectData ? (
        <ScrollView style={{ backgroundColor: "#e9ecef" }}>
          <BillSummary
            storeId={store.id}
            updatedItems={updatedItems}
            itemsTotal={itemsTotal}
            breakup={breakup}
            grandTotal={grandTotal}
            savings={savings}
          />
          <YourDetails />
          <CancellationPolicy isCancellable={cancellable} />
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Can't reach the seller right now :(
          </Text>
          <Text
            style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}
          >
            Try again later . .
          </Text>
        </View>
      )}

      {onSelectData &&
        !isLoading &&
        (enablePayment ? (
          <View style={styles.buttons}>
            <SlideButton
              title={`Slide  to  Pay  |  ₹${grandTotal}`}
              titleStyle={styles.paymentButtonText}
              icon={renderIcon()}
              containerStyle={styles.payButton}
              underlayStyle={styles.payButtonUnderlay}
              thumbStyle={styles.payThumb}
              height={52}
              borderRadius={50}
              padding={0}
              onReachedToEnd={() => {
                handleInit();
              }}
              autoReset={true}
              animation={true}
              animationDuration={300}
            />
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomContainerText}>
              Remove all unavaliable items from the cart to proceed!
            </Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  backIcon: {
    paddingHorizontal: 15,
  },
  sellerInfoContainer: {
    padding: 10,
    backgroundColor: "#fff",
    // marginBottom: 16,
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth: 0.2,
    // gap: 20,
  },
  sellerInfo: {
    flex: 1,
    // gap: 5,
  },
  locContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationBar: {
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 25,
    margin: 5,
    gap: 2,
  },
  locText: {
    fontSize: 16,
    fontWeight: "500",
  },
  imgContainer: {
    backgroundColor: "white",
    // marginHorizontal: 10,
    borderRadius: 10,
  },
  sellerLogo: {
    width: 60,
    height: 60,
    // borderRadius: 8,
    marginRight: 16,
    objectFit: "contain",
    borderColor: "#e9ecef",
    borderWidth: 1,
    borderRadius: 10,
  },
  sellerName: {
    fontSize: 16,
    marginBottom: 1,
    fontWeight: "bold",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  distance: {
    color: "#666",
    marginBottom: 1,
  },

  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  horizontalBar: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: "500",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loadingContainer: {
    backgroundColor: "transparent",
    padding: 15,
    height: Dimensions.get("window").height - 200,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    // marginVertical: 3,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    paddingVertical: 2,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderTopWidth: 0.2,
  },

  paymentButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  payIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    tintColor: "#00E096",
  },
  payButton: {
    backgroundColor: "#14a16d",
    // borderWidth: 0.3,
  },
  payButtonUnderlay: {
    backgroundColor: "transparent",
  },
  payThumb: {
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  bottomContainer: {
    padding: 15,

    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  bottomContainerText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Checkout;
function _textBody(arg0: string): string {
  throw new Error("Function not implemented.");
}
