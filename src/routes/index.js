import { Button, Icon, IconButton, Text } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { BiDonateHeart } from 'react-icons/bi';
import { FiUser, FiUsers } from "react-icons/fi";
import { RiChat3Line } from 'react-icons/ri';

import HomeScreen from '../screens/Home';
import ChangePasswordScreen from '../screens/Profile/ChangePassword';
import EditProfileScreen from '../screens/Profile/EditProfile';
import ECContactsScreen from '../screens/Profile/ECContacts';
import ProfileScreen from '../screens/Profile';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Registration'

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeTab = createBottomTabNavigator();

const HomeTabIcon = ({ focused, icon, text }) => {
  return (
    <>
      <Icon
        as={icon}
        color={focused ? '#188ffc' : '#1f2937'}
        name={text}
        size={4}
      />
      <Text
        color={focused ? '#188ffc' : '#1f2937'}
        fontSize="10px"
      >
        {text}
      </Text>
    </>
  );
};

const SOSIcon = () => {
  return (
    <Button
      variant="solid"
      style={{
        border: '4px solid white',
        borderRadius: '100%',
        backgroundColor: '#eb3434',
        width: 50,
        height: 50,
        bottom: 20,
      }}
      onPress={() => alert('SOS')}
    >
      SOS
    </Button>
  );
}

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="ECContacts" component={ECContactsScreen} />
      <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </ProfileStack.Navigator>
  );
}

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator
      initialRouteName="5"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <HomeTab.Screen name="1" component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => HomeTabIcon({ focused, icon: RiChat3Line, text: 'Chats' }),
        }}
      />
      <HomeTab.Screen name="2" component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => HomeTabIcon({ focused, icon: BiDonateHeart, text: 'Assistance' }),
        }}
      />
      <HomeTab.Screen name="3" component={HomeScreen}
        options={{
          tabBarButton: () => SOSIcon(),
        }}
      />
      <HomeTab.Screen name="4" component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => HomeTabIcon({ focused, icon: FiUsers, text: 'Friends' }),
        }}
      />
      <HomeTab.Screen name="5" component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => HomeTabIcon({ focused, icon: FiUser, text: 'Profile' }),
        }}
      />
    </HomeTab.Navigator>
  );
}

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Register" component={RegisterScreen} />

    </LoginStack.Navigator>
  );
}


const Routes = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginStackScreen} />
          <Stack.Screen name="Home" component={HomeTabScreen} />
          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Routes;
