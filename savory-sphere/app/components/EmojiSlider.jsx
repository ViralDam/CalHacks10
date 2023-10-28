import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';

const EmojiSlider = ({ minValue = 0, maxValue = 10, onValueChange }) => {
  const [sliderValue, setSliderValue] = useState(minValue);
  const pan = useRef(new Animated.ValueXY()).current;
  const sliderWidth = Dimensions.get('window').width - 60; // Adjust for your layout
  const maxTranslateX = sliderWidth - 40; // Width of the handle

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x }],
        {
          listener: (event, gestureState) => {
            let value = Math.max(minValue, Math.min(maxValue, gestureState.dx / (sliderWidth / (maxValue - minValue))));
            setSliderValue(value);
            onValueChange(value);
          },
          useNativeDriver: false
        }
      ),
      onPanResponderRelease: () => {
        // Logic on release, if needed
      },
    })
  ).current;

  useEffect(() => {
    pan.x.addListener((value) => {
      let sliderValue = Math.max(minValue, Math.min(maxValue, value.value / (maxTranslateX / (maxValue - minValue))));
      setSliderValue(sliderValue);
    });

    return () => {
      pan.x.removeAllListeners();
    };
  }, [maxTranslateX, minValue, maxValue]);

  return (
    <View style={styles.sliderTrack}>
      <Animated.View style={{ ...styles.sliderHandle, transform: [{ translateX: pan.x }] }} {...panResponder.panHandlers} />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderTrack: {
    width: '100%',
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 20,
    justifyContent: 'center',
  },
  sliderHandle: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default EmojiSlider;
