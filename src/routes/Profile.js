import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text } from "native-base";
import { useEditProfileStore } from "../store/EditProfileStore";

import IconFe from 'react-native-vector-icons/Feather';

import ChangePasswordScreen from "../screens/Profile/ChangePassword";
import EditProfileScreen from "../screens/Profile/EditProfile";
import ECContactsScreen from "../screens/Profile/ECContacts";
import ProfileScreen from "../screens/Profile";

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = ({ navigation }) => {

  const setShowModal = useEditProfileStore(state => state.setShowModal);

  const saveEditProfile = () => {
    console.log("saveEditProfile");
  }

  const backEditProfile = () => {
    setShowModal(true);
  };

  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarShowLabel: false,
        headerLeft: () => { return <Text fontWeight="bold" fontSize="26px" pl={4}>Profile</Text> },
        headerShadowVisible: false,
        title: "",
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
          headerShadowVisible: true,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <IconFe
              name="chevron-left"
              size="28px"
              onPress={() => setShowModal(true)}
            />
          ),
          headerRight: () => (
            <Text color="#188ffc" fontSize="18px" onPress={() => navigation.navigate("Profile")}>Save</Text>
          ),
        }}
      />
      <ProfileStack.Screen name="ECContacts" component={ECContactsScreen} />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;