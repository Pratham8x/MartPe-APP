// import React from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { fashionCategories } from "../../data";

// const FashionCategoriesDropdown = () => {
//   return (
//     <View style={styles.dropdownContainer}>
//       {fashionCategories.map((category) => {
//         return (
//           <TouchableOpacity style={styles.dropdownItem}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Image
//                 style={styles.dropdownItemImage}
//                 source={{ uri: category.image }}
//               />
//               <Text style={styles.dropdownItemText}>
//                 {category.title.length > 15
//                   ? category.title.slice(0, 15) + "..."
//                   : category.title}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// export default FashionCategoriesDropdown;

// const styles = StyleSheet.create({
//   dropdownContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     backgroundColor: "#fff",
//     marginHorizontal: 10,
//     paddingVertical: 10,
//     padding: 10,
//     marginBottom: 15,
//     elevation: 5,
//     borderRadius: 10,
//   },
//   dropdownItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "49%",
//     paddingVertical: 5,
//     borderWidth: 0.5,
//     borderColor: "#bdbdbd",
//     marginVertical: 5,
//   },
//   dropdownItemImage: {
//     width: 25,
//     height: 25,
//     borderRadius: 50,
//     marginHorizontal: 10,
//   },
//   dropdownItemText: {},
// });
import { FC } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fashionCategories } from "../../../data";

const FashionCategoriesDropdown: FC = () => {
  return (
    <ScrollView
      style={styles.dropdownContainer}
      contentContainerStyle={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
      }}
    >
      {fashionCategories.map((category, index) => {
        return (
          <TouchableOpacity key={index} style={styles.dropdownItem}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: "#e8e8e8",
                // backgroundColor: "#a3fbfb20",
                backgroundColor: "#fff",
                borderWidth: 0.5,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <Image
                style={styles.dropdownItemImage}
                source={{ uri: category.image }}
              />
              <Text
                style={styles.dropdownItemText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {category?.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FashionCategoriesDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    flex: 1,
    flexDirection: "row",

    // justifyContent: "flex-start",
    columnGap: 10,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    // marginHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingLeft: 15,
    // marginHorizontal: 10,
    // marginBottom: 15,
    // elevation: 5,
    // borderRadius: 10,
    // borderTopWidth: 0.8,
    // borderWidth: 1,
    // borderColor: "#e8e8e8",
  },
  dropdownItem: {
    // flexDirection: "row",
    // alignItems: "center",
    // width: "30%",
    // paddingVertical: 5,
    // borderWidth: 0.5,
    color: "#bdbdbd",
    marginVertical: 5,
    borderRadius: 5,
  },
  dropdownItemImage: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 5,
  },
  dropdownItemText: {
    fontSize: 12,
    marginHorizontal: 5,
  },
});
