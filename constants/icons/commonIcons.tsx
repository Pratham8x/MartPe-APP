import React from "react";
import Svg, { Path } from "react-native-svg";

export const FavIcon = (props) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.499 5.499 0 0 0 0-7.78Z"
      />
    </Svg>
  )

export const BackArrow = (props) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={17}
      fill="none"
      {...props}
    >
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.143 15.572 1.286 8.713l6.857-6.857"
      />
    </Svg>
  )

  const MenuIcon
  
  = (props) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12.2 6.8a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12.2 19.6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    </Svg>
  )
  export default MenuIcon

  