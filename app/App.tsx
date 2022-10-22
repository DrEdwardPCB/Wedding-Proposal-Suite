/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { type PropsWithChildren } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "./src/pages/homePage";
import { SettingPage } from "./src/pages/settingPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LocationPage } from "./src/pages/locationPage";
import { CameraPage } from "./src/pages/cameraPage";
import { PasscodePage } from "./src/pages/passcodePage";
import { store, persistor } from "./src/redux/store";
import { NativeBaseProvider } from "native-base";

const Tab = createBottomTabNavigator();

const App = () => {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Provider store={store}>
            <PersistGate
                loading={<Text>Loading...</Text>}
                persistor={persistor}>
                <NativeBaseProvider>
                    <NavigationContainer>
                        <Tab.Navigator
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => {
                                    let iconName;

                                    if (route.name === "Home") {
                                        iconName = focused
                                            ? "ios-information-circle"
                                            : "ios-information-circle-outline";
                                    } else if (route.name === "Settings") {
                                        iconName = focused
                                            ? "ios-list-box"
                                            : "ios-list";
                                    }

                                    // You can return any component that you like here!
                                    return (
                                        <Ionicons
                                            name={
                                                iconName ??
                                                "ios-information-circle"
                                            }
                                            size={size}
                                            color={color}
                                        />
                                    );
                                },
                                tabBarActiveTintColor: "tomato",
                                tabBarInactiveTintColor: "gray",
                            })}>
                            <Tab.Screen name='Home' component={HomePage} />
                            <Tab.Screen
                                name='Location'
                                component={LocationPage}
                            />
                            <Tab.Screen name='Camera' component={CameraPage} />
                            <Tab.Screen
                                name='Passcode'
                                component={PasscodePage}
                            />
                            <Tab.Screen
                                name='Settings'
                                component={SettingPage}
                            />
                        </Tab.Navigator>
                    </NavigationContainer>
                </NativeBaseProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
