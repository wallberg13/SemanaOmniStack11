// docs.expor.io ==> Documentação.
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Incidents from "./pages/Incidents";
import Detail from "./pages/Detail";

export default function Routes() {
  return (
    // É como se fosse o Browser Router
    <NavigationContainer>
      {/* É como se fosse o Switch */}
      {/* Propriedade de HeaderShown é para que o título do cabeçalho não apareça */}
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Screen é a rota em si */}
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
