// import React, {Component} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {
//   createNativeStackNavigator,
//   NativeStackNavigationProp,
// } from '@react-navigation/native-stack';
// import Home from '@/pages/Home';
// import Detail from '@/pages/Detail';

// export type RootStackParamList = {
//   Home: undefined;
//   Detail: {id: string};
// };
// export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

// const Stack = createNativeStackNavigator<RootStackParamList>();

// class Navigator extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Home"
//           screenOptions={{
//             headerTitleAlign: 'center',
//           }}>
//           <Stack.Screen
//             name="Home"
//             component={Home}
//             options={{title: '首页'}}
//           />
//           <Stack.Screen
//             name="Detail"
//             component={Detail}
//             options={{title: '详情页'}}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }

// export default Navigator;

export default {};
