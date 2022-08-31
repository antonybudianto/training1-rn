import { ScrollView, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

import Ionicons from "@expo/vector-icons/Ionicons";

import usePriceChanges from "../hooks/usePriceChanges";
import useCurrencies from "../hooks/useCurrencies";

const pairMainCurrency = "idr";
const locale = Intl.NumberFormat("id");

const rowStyle = {
  backgroundColor: "white",
  height: 68,
  borderBottomColor: "lightgray",
  borderBottomWidth: 0.5,
};

const MarketScreen = () => {
  const currencies = useCurrencies();
  const { hashmap } = usePriceChanges();

  return (
    <View
      style={{
        marginBottom: 38,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 15,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Sort By
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text>Default</Text>
          <Ionicons name={`caret-down-outline`} size={18} color="black" />
        </View>
      </View>
      <ScrollView style={{ height: "100%" }}>
        {currencies.map((d, i) => {
          const latest =
            hashmap[`${d.currencySymbol.toLowerCase()}/${pairMainCurrency}`] ||
            {};
          const day = parseFloat(latest.day) || 0;
          const dayMinus = day < 0;
          return (
            <View key={i} style={rowStyle}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: 15,
                }}
              >
                <View>
                  <SvgUri width={30} height={30} uri={d.logo} />
                </View>
                <View style={{ width: "50%", flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>{d.name}</Text>
                  <Text style={{ color: "gray" }}>{d.currencySymbol}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Rp{locale.format(latest.latestPrice || 0)}
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginTop: 2,
                    }}
                  >
                    <Ionicons
                      name={`caret-${dayMinus ? "down" : "up"}-outline`}
                      size={18}
                      color={dayMinus ? "red" : "green"}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        // backgroundColor: "pink",
                        color: dayMinus ? "red" : "green",
                        textAlign: "right",
                      }}
                    >
                      {dayMinus ? "-" : "+"}
                      {Math.abs(day)}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MarketScreen;
