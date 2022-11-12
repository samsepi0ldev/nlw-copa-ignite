import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'

import { New } from '../screens/New'
import { Polls } from '../screens/Pools'
import { Find } from '../screens/Find'
import { Details } from '../screens/Details'

const Tab = createBottomTabNavigator()

export function AppRoutes () {
  const { colors, sizes } = useTheme()
  const size = sizes[6]
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        height: sizes[22],
        backgroundColor: colors.gray[800],
        borderTopWidth: 0
      },
      tabBarItemStyle: {
        position: 'relative',
        top : Platform.OS === 'android' ? -10 : 0
      }
    }}>
      <Tab.Screen
        name='new'
        component={New}
        options={{
          tabBarLabel: 'Novo bolão',
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />
        }} />
      <Tab.Screen
        name='polls'
        component={Polls}
        options={{
          tabBarLabel: 'Meus bolões',
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />
        }} />
        <Tab.Screen
          name='find'
          component={Find}
          options={{ tabBarButton: () => null }} />
        <Tab.Screen
          name='details'
          component={Details}
          options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  )
}