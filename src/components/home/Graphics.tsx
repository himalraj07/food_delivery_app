import {homeStyles} from '@unistyles/homeStyles';
import LottieView from 'lottie-react-native';
import React from 'react';

import {Platform, StatusBar, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';

const Graphics = () => {
  const {styles} = useStyles(homeStyles);

  return (
    <View style={styles.lottieContainer} pointerEvents="none">
      <StatusBar hidden={Platform.OS === 'android'} />
      <LottieView
        enableMergePathsAndroidForKitKatAndAbove
        enableSafeModeAndroid
        style={styles.lottie}
        source={require('@assets/animations/event.json')}
        autoPlay
        loop
        hardwareAccelerationAndroid
      />
    </View>
  );
};

export default Graphics;
