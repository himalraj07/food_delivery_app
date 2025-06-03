import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {phoneStyles} from '@unistyles/phoneStyles';
import React, {FC} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PhoneInputProps {
  value: string;
  onChange: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const PhoneInput: FC<PhoneInputProps> = ({
  value,
  onChange,
  onBlur,
  onFocus,
}) => {
  const {styles} = useStyles(phoneStyles);

  return (
    <View style={styles.container}>
      <Pressable style={styles.countryPickerContainer}>
        <CustomText variant="h4">🇳🇵</CustomText>
        <Ionicons
          // iconFamily="Ionicons"
          name="caret-down-sharp"
          color={Colors.lightText}
          size={18}
        />
      </Pressable>

      <View style={styles.phoneInputContainer}>
        <CustomText fontFamily="Okra-Bold">+977</CustomText>
        <TextInput
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          value={value}
          maxLength={10}
          placeholderTextColor={Colors.lightText}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default PhoneInput;
