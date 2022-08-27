import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomeScreen!</Text>
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
    </View>
  );
};

export default HomeScreen;
