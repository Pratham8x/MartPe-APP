import { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useUserDetails from "../../hook/useUserDetails";
import { router } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

const profileItems = [
  {
    icon: "assignment",
    title: "My Orders",
    subTitle: "Orders delivered, In progress",
    cta: { url: "/(tabs)/orders" },
  },
  {
    icon: "home-work",
    title: "My Addresses",
    subTitle: "Change or manage addresses",
    cta: { url: "/address/SavedAddresses" },
  },
  {
    icon: "support-agent",
    title: "Support",
    subTitle: "Connect with customer care",
    cta: { url: "/(accountFunction)/support" },
  },
  {
    icon: "info",
    title: "Terms & Conditions",
    subTitle: "Read terms and conditions",
    cta: { url: "/(aux)/terms-and-conditions" },
  },
  {
    icon: "policy",
    title: "Privacy policy",
    subTitle: "Read our policy document",
    cta: { url: "/(aux)/privacy-policy" },
  },
  {
    icon: "logout",
    title: "Log out",
    subTitle: null,
    cta: { url: "/(auth)/" },
  },
];

const shadowEffect = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};

const Profile = () => {
  const { removeUserDetails, userDetails, getUserDetails } = useUserDetails();

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleRemoveUserDetails = async () => {
    await removeUserDetails();
    router.replace("/(auth)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        {userDetails && (
          <View style={styles.container}>
            {/* profile container */}
            <View style={styles.profileContainer}>
              <AntDesign name="user" style={styles.profileIcon} />
              <View>
                <Text style={styles.profileName}>
                  {userDetails?.firstName ? userDetails?.firstName : "Unknown"}
                  {userDetails?.lastName ? ` ${userDetails?.lastName}` : ""}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                  <MaterialIcons name="phone" style={styles.phoneIcon} />
                  <Text style={styles.profilePhoneNumber}>
                    {userDetails?.phoneNumber ?? "Add number"}
                  </Text>
                </View>
              </View>
            </View>

            {/* profile items container */}
            {profileItems && (
              <View style={styles.profileItems}>
                {profileItems.map((profileItem, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.row}
onPress={
  profileItem?.cta
    ? () => router.push({ pathname: profileItem?.cta?.url as any})
    : () => {}
}

                  >
                    <View style={styles.iconTextContainer}>
                      <View>
                        <MaterialIcons
                          name={profileItem.icon as any}
                          style={styles.icon}
                        />
                      </View>

                      <View
                        style={{
                          borderBottomWidth:
                            index !== profileItems.length - 1 ? 0.5 : 0,
                          borderColor: "#EEEEEE",
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          padding: 10,
                          minHeight: 70,
                        }}
                      >
                        <View style={styles.textContainer}>
                          {profileItem?.title && (
                            <Text style={styles.title}>
                              {profileItem?.title}
                            </Text>
                          )}
                          {profileItem?.subTitle && (
                            <Text style={styles.subTitle}>
                              {profileItem.subTitle}
                            </Text>
                          )}
                        </View>

                        {profileItem?.cta && (
                          <View>
                            <MaterialIcons
                              name="chevron-right"
                              style={styles.ctaIcon}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* tokens container */}
            <View style={{ paddingVertical: 10, marginVertical: 10 }}>
              <Text style={{ fontSize: 20, marginVertical: 10, fontWeight: "bold" }}>
                User Tokens
              </Text>

              <Text style={{ fontWeight: "bold" }}>Access Token:</Text>
              {userDetails?.accessToken ? (
                <ScrollView horizontal style={styles.tokens}>
                  <Text style={{ fontSize: 9 }}>{userDetails.accessToken}</Text>
                </ScrollView>
              ) : null}

              <Text style={{ fontWeight: "bold" }}>Refresh Token:</Text>
              {userDetails?.refreshToken ? (
                <ScrollView horizontal style={styles.tokens}>
                  <Text style={{ fontSize: 9 }}>{userDetails.refreshToken}</Text>
                </ScrollView>
              ) : null}
            </View>

            {/* remove user details button */}
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.removeUserDetailsbutton}
                onPress={handleRemoveUserDetails}
              >
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                  Remove User Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  profileContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    rowGap: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  profileItems: {
    backgroundColor: "#fff",
    borderRadius: 10,
    ...shadowEffect,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: "#030303",
    marginHorizontal: 15,
    fontSize: 25,
    alignSelf: "center",
  },
  ctaIcon: {
    color: "#8f8f90",
    marginHorizontal: 15,
    fontSize: 20,
    alignSelf: "center",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {},
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
  },
  removeUserDetailsbutton: {
    width: widthPercentageToDP("90"),
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: "#030303",
    alignItems: "center",
    marginVertical: 10,
  },
  tokens: {
    marginBottom: 10,
    flexGrow: 0.2,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    ...shadowEffect,
  },
  profileIcon: {
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    fontSize: 30,
    alignSelf: "center",
    color: "#030303",
    padding: 20,
    marginHorizontal: 10,
  },
  phoneIcon: {
    fontSize: 16,
    color: "#030303",
    marginRight: 5,
  },
  profileName: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  profilePhoneNumber: {
    fontSize: 12,
    fontWeight: "400",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 25,
  },
});
