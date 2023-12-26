import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";

import HomeStack from "./HomeStack";
import MyPrograms from "../screens/MyPrograms";
import StoreScreen from "../screens/StoreScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          activeColor="#f8c423"
          inactiveColor="#838184"
          style={{ backgroundColor: "#000" }}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="youtube-tv" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Programs"
        component={MyPrograms}
        options={{
          tabBarLabel: "Mes programmes",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="bookmark" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarLabel: "Store",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="shopping-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
