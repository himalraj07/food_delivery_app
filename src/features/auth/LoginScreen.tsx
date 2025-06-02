import {View, StatusBar, Platform, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import React, {FC} from 'react';
import {loginStyles} from '@unistyles/authStyles';
import {useStyles} from 'react-native-unistyles';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';

const LoginScreen: FC = () => {
  const {styles} = useStyles(loginStyles);

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS === 'android'} />

      <Image
        source={require('@assets/images/login.png')}
        style={styles.cover}
      />

      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.bottomContainer}>
        <CustomText fontFamily="Okra-Bold" variant="h2" style={styles.title}>
          Nepal's #1 Food Delivery and Dining App
        </CustomText>

        <BreakerText text="Log in or sign up" />
      </Animated.ScrollView>
    </View>
  );
};

export default LoginScreen;
