import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC, memo, useRef} from 'react';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '@unistyles/foodStyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import AnimatedNumbers from 'react-native-animated-numbers';
import ScalePress from '@components/ui/ScalePress';
import Icon from '@components/global/Icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppDispatch} from '@states/reduxHook';

const AddButton: FC<{item: any; restaurant: any}> = ({item, restaurant}) => {
  const dispatch = useAppDispatch();
  const {styles} = useStyles(foodStyles);
  const cart = null;
  const modalRef = useRef<any>(null);

  const addCartHandler = () => {};
  const removeCartHandler = () => {};

  return (
    <>
      <View style={styles.addButtonContainer(cart !== null)}>
        {cart ? (
          <View style={styles.selectedContainer}>
            <ScalePress onPress={removeCartHandler}>
              <Icon
                iconFamily="MaterialCommunityIcons"
                color="#fff"
                name="minus-thick"
                size={RFValue(13)}
              />
            </ScalePress>
            <AnimatedNumbers
              includeComma={false}
              animationDuration={300}
              animateToNumber={cart?.quantity}
              fontStyle={styles.animatedCount}
            />
            <ScalePress onPress={addCartHandler}>
              <Icon
                iconFamily="MaterialCommunityIcons"
                color="#fff"
                name="plus-thick"
                size={RFValue(13)}
              />
            </ScalePress>
          </View>
        ) : (
          <TouchableOpacity
            onPress={addCartHandler}
            style={styles.noSelectionContainer}
            activeOpacity={0.6}
            accessibilityLabel="Add item to cart">
            <CustomText
              fontFamily="Okra-Bold"
              variant="h5"
              color={Colors.primary}>
              ADD
            </CustomText>
            <CustomText
              variant="h5"
              color={Colors.primary}
              style={styles.plusSmallIcon}>
              +
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      {item?.isCustomizable && (
        <CustomText fontFamily="Okra-Medium" style={styles.customizeText}>
          Customisable
        </CustomText>
      )}
    </>
  );
};

export default memo(AddButton);
