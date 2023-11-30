import Button from "@/components/shared/button";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigations/types";

import { AnimatedBox, Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const INFINITE_NOTE_IMAGE = "https://iili.io/Jxq9Yp1.png";

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };
  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaWrapper>
      <LinearGradient
        colors={[
          "#ffffff",
          "#fcecff",
          "#f8daff",
          "#fae2ff",
          "#fae2ff",
          "#ffffff",
        ]}
        style={{ flex: 0.8 }}
      >
        <Box flex={0.8} justifyContent="center">
          <Box alignItems="center">
            <Animated.View entering={ZoomIn.duration(2000)}>
              <Image
                source={{
                  uri: INFINITE_NOTE_IMAGE,
                  width: 200,
                  height: 200,
                }}
              />
            </Animated.View>
          </Box>
          <Text textAlign="center" variant="textXl" fontWeight="700">
            Do you want to be more productive?
          </Text>
          <Box my="3.5" mx="10">
            <Button
              label="Start your journey"
              onPress={navigateToSignUpScreen}
            />
          </Box>
          <Text
            textAlign="center"
            variant="textXs"
            fontWeight="700"
            color="gray5"
          >
            1,000,000 registered today
          </Text>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;
