import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';
import { useState, useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolateColor } from 'react-native-reanimated';
import { useNavigationStateContext } from '@contexts/NavigationContext';

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = dimensions.width / 3;
  
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);
  const backgroundColor = useSharedValue(0); // 0 for tab screen color, 1 for other screens
  const { isTabScreen, setIsTabScreen } = useNavigationStateContext();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
      backgroundColor: interpolateColor(
        backgroundColor.value,
        [0, 1],
        ['#00419d', '#F7F7F8']
      ),
    };
  });

  const updateTabPosition = (index: number, isTabScreen: boolean) => {
    tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 });
    backgroundColor.value = withSpring(isTabScreen ? 0 : 1);
    setIsTabScreen(isTabScreen);
  };

  useEffect(() => {
    const currentRoute = state.routes[state.index].name;
    const isTabScreenRoute = ['Home', 'Arquivos', 'Usuário'].includes(currentRoute);

    const currentTabIndex = ['Home', 'Arquivos', 'Usuário'].indexOf(currentRoute);
    
    if (isTabScreenRoute) {
      updateTabPosition(currentTabIndex, true); // Update tab position and background for tabbed screens
    } else {
      backgroundColor.value = withSpring(1); // Change background color for non-tab screens
    }
  }, [state.index]);

  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View
        style={[animatedStyle, {
          position: 'absolute',
          borderRadius: 30,
          marginHorizontal: 12,
          height: dimensions.height - 15,
          width: buttonWidth - 25,
        }]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const isTabScreen = ['Home', 'Arquivos', 'Usuário'].includes(route.name);
          updateTabPosition(index, isTabScreen);

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (['Home', 'Arquivos', 'Usuário'].includes(route.name)) {
          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              isFocused={isFocused}
              routeName={route.name}
              label={label}
            />
          );
        }
        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F8',
    marginHorizontal: 55,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
