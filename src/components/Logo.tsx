import React from "react";
import { StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center"
  }
});

const Logo: React.FC = () => {
  return (
    <Image style={styles.logo} source={require("../assets/snack-icon.png")} />
  );
};

export default Logo;
