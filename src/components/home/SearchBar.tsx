import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import {useSharedState} from '@features/tabs/SharedContext';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';

const searchItems: string[] = [
  'Search "chai samosa"',
  'Search "Cake"',
  'Search "ice cream"',
  'Search "pizza"',
  'Search "Biryani"',
];

const SearchBar = () => {
  const isVegMode = true;

  const {styles} = useStyles(homeStyles);
  const {scrollYGlobal} = useSharedState();

  const textColorAnimation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);
    return {
      color: `rgba(${textColor}, ${textColor}, ${textColor})`,
    };
  });

  return (
    <>
      <SafeAreaView />
      <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity
          style={styles.searchInputContainer}
          activeOpacity={0.8}>
          <Icon
            iconFamily="Ionicons"
            name="search"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </>
  );

};

export default SearchBar;
