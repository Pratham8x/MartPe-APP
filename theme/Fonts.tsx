const Fonts = {
  regular: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "ClashGrotesk-Regular",
      // fontWeight: '400',
    };
  },
  light: (s = 11) => {
    return {
      fontSize: s,
      // fontFamily: 'ClashGrotesk-Light',
    };
  },
  italic: (s = 12) => {
    return {
      fontSize: s,
      // fontFamily: 'ClashGrotesk-Light',
    };
  },
  medium: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "ClashGrotesk-Medium",
      // fontWeight: '500',
    };
  },
  bold: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "ClashGrotesk-Bold",
      // fontWeight: 'bold',
    };
  },
  semiBold: (s = 12) => {
    return {
      fontFamily: "ClashGrotesk-Semibold",
      fontSize: s,
      // fontWeight: '500',
    };
  },
  regularMontserrat: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "Montserrat-Regular",
      // fontWeight: '400',
    };
  },
  lightMontserrat: (s = 11) => {
    return {
      fontSize: s,
      fontFamily: "Montserrat-Light",
    };
  },
  italicMontserrat: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "Montserrat-Italic",
    };
  },
  mediumMontserrat: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "Montserrat-Medium",
      // fontWeight: '500',
    };
  },
  boldMontserrat: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "Montserrat-Bold",
      // fontWeight: 'bold',
    };
  },
  semiBoldMontserrat: (s = 12) => {
    return {
      fontFamily: "Montserrat-SemiBold",
      fontSize: s,
      // fontWeight: '500',
    };
  },
  regularPoppins: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "Poppins-Regular",
      // fontWeight: '400',
    };
  },
  lightPoppins: (s = 11) => {
    return {
      fontSize: s,
      fontFamily: "ClashGrotesk-Light",
    };
  },
  italicPoppins: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "Poppins-Light",
    };
  },
  mediumPoppins: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "Poppins-Medium",
      // fontWeight: '500',
    };
  },
  boldPoppins: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: "Poppins-Bold",
      // fontWeight: 'bold',
    };
  },
  semiBoldPoppins: (s = 12) => {
    return {
      fontFamily: "Poppins-SemiBold",
      fontSize: s,
      // fontWeight: '500',
    };
  },
};

export { Fonts };
