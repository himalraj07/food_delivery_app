import {homeStyles} from '@unistyles/homeStyles';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Platform, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';

const Graphics = () => {
  const {styles} = useStyles(homeStyles);

  return (
    <View style={styles.lottieContainer} pointerEvents="none">
      <LottieView
        enableMergePathsAndroidForKitKatAndAbove
        enableSafeModeAndroid
        style={styles.lottie}
        source={require('@assets/animations/event.json')}
        autoPlay
        loop={Platform.OS === 'android'}
        hardwareAccelerationAndroid
      />
    </View>
  );
};

export default Graphics;
