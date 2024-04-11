import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import {Text, View} from "react-native"
import Main from "./Main";
import Account from "./Account";

const Home = () => {

    const Tab = createBottomTabNavigator();
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen name="Main" component={Main} options={{headerShown: false}}/>
                <Tab.Screen name="Account" component={Account} options={{headerShown: false}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Home