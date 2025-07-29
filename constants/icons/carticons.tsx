import React from "react";
import Svg, { Path } from "react-native-svg";

export const IncrementIcon = (props) => (
  <Svg width={15} height={14} fill="none" {...props}>
    <Path
      stroke={props.disabled ? "#00BC6666" : "#00BC66"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.727 2.917v8.166M3.644 7h8.166"
    />
  </Svg>
);

export const DecrementIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.disabled ? "#00BC6666" : "#00BC66"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.644 7h8.166"
    />
  </Svg>
);

const DownArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.5 5.25 7 8.75l3.5-3.5"
    />
  </Svg>
);
export default DownArrow;
