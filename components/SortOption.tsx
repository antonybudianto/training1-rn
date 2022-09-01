import { Text, View } from "react-native";
import AntIcon from "@expo/vector-icons/AntDesign";
import { FC } from "react";

interface SortOptionProps {
  text: string;
  active?: boolean;
  onClick: () => void;
}

const SortOption: FC<SortOptionProps> = ({ text, active, onClick }) => {
  return (
    <View
      onTouchEnd={onClick}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        padding: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: active ? "lightgray" : "white",
      }}
    >
      <AntIcon
        name="up-square-o"
        size={25}
        color="black"
        style={{ marginRight: 10 }}
      />
      <Text>{text}</Text>
    </View>
  );
};

export default SortOption;
