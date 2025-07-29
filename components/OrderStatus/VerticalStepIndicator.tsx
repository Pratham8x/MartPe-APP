import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { orderStateMap } from "./orderStateMap";
import getDuration from "../../utility/parse_8601_time";

const indicatorStyles = {
  stepStrokeCurrentColor: "#00BC66",
  stepStrokeFinishedColor: "#00BC66",
  stepStrokeUnFinishedColor: "#999999",
  separatorFinishedColor: "#00BC66",
  separatorUnFinishedColor: "#999999",
  stepIndicatorFinishedColor: "#00BC66",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelCurrentColor: "#00BC66",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#999999",
  currentStepLabelColor: "#00BC66",
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  labelSize: 13,
};

export default function VerticalStepIndicator({
  status,
  fulfillments,
  placed_at,
  completed_at,
  cancelled_at,
}: {
  status: string;
  fulfillments: object;
  placed_at: string;
  completed_at: string;
  cancelled_at: string;
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const getStepIndicatorIconConfig = ({
    position,
    stepStatus,
  }: {
    position: number;
    stepStatus: string;
  }) => {
    const iconConfig = {
      name: "location-history",
      color:
        stepStatus === "finished"
          ? "#ffffff"
          : currentPage === position
          ? "#00BC66"
          : "#999999",
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "payment";
        break;
      }
      case 1: {
        iconConfig.name = "shopping-bag";
        break;
      }
      // case 2: {
      //   iconConfig.name = "location-history";
      //   break;
      // }
      case 2: {
        iconConfig.name = "local-shipping";
        break;
      }
      case 3: {
        iconConfig.name = "done-outline";
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };

  const renderInProgressStatus = () => {
    const messages = [];

    // Iterate through each in-progress state and check if it exists in the fulfillments object
    for (const key in orderStateMap["in-progress"].fulfillment_states) {
      if (fulfillments[key]) {
        messages.push(
          orderStateMap["in-progress"].fulfillment_states[key].message
        );
      }
    }
    console.log("messages", messages, fulfillments);
    return messages.map((message, index) => (
      <Text style={styles.stepLabel} key={index}>
        {message}
      </Text>
    ));
  };

  const renderStepIndicator = (params: any) => (
    <MaterialIcons {...(getStepIndicatorIconConfig(params) as any)} />
  );

  useEffect(() => {
    // Find the index of the current order state in orderStateMap
    const currentIndex = Object.keys(orderStateMap).findIndex(
      (key) => key === status
    );
    setCurrentPage(currentIndex);
    console.log("orderStatus: ", status);
    console.log("Current Index: ", currentIndex);
  }, [status]);

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={indicatorStyles}
          currentPosition={currentPage}
          renderStepIndicator={renderStepIndicator}
          stepCount={4}
          labels={Object.values(orderStateMap).map((state) => state.message)}
          renderLabel={({ position, stepStatus, label, currentPosition }) => (
            <View style={styles.label}>
              <Text
                style={[
                  stepStatus === "finished"
                    ? styles.stepLabelSelected
                    : styles.stepLabel,
                  {
                    color:
                      position == currentPosition
                        ? "#000"
                        : "rgba(0, 0, 0, 0.5)",
                  },
                  {
                    fontWeight: position == currentPosition ? "600" : "400",
                  },
                ]}
              >
                {label}
              </Text>
              {position === 2 ? (
                <View>{renderInProgressStatus()}</View>
              ) : (
                <Text
                  style={[
                    stepStatus === "finished"
                      ? styles.timeSelected
                      : styles.time,
                    {
                      color:
                        position == currentPosition
                          ? "#000"
                          : "rgba(0, 0, 0, 0.5)",
                    },
                  ]}
                >
                  {/* {position === 0 && getDuration(placed_at.slice(11,-1))} */}
                  {position === 0 && placed_at?.slice(0, 10)}
                  {position === 3 && completed_at?.slice(0, 10)}
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderColor: "#e9ecef",
    // borderWidth: 1,
    borderRadius: 10,
    // flexDirection: "row",
    // paddingHorizontal: 15,
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 30,
  },
  stepIndicator: {
    flex: 1,
    // elevation: 2,
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 10,
  },
  label: {
    // marginLeft: 15,
    flexDirection: "column",
    justifyContent: "center",
    // backgroundColor: "black",
    // flex: 1,
    marginHorizontal: 5,
  },
  stepLabel: {
    fontSize: 10,
    textAlign: "center",
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: "#4aae4f",
  },
  time: {
    fontSize: 8,
    color: "#999999",
    textAlign: "center",
  },
  timeSelected: {
    fontSize: 8,
    color: "#4aae4f",
    textAlign: "center",
  },
});
