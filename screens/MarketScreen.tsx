import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

import Ionicons from "@expo/vector-icons/Ionicons";

import usePriceChanges from "../hooks/usePriceChanges";

const pairMainCurrency = "idr";
const locale = Intl.NumberFormat("id");

const rowStyle = {
  backgroundColor: "white",
  height: 68,
  borderBottomColor: "lightgray",
  borderBottomWidth: 0.5,
};

const contentStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  padding: 15,
};

const MarketScreen = () => {
  const [data, setData] = useState([]);

  const fetchCurrencies = useCallback(() => {
    fetch("https://api.pintu.co.id/v2/wallet/supportedCurrencies")
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        // console.log(json);
        setData(json.payload.slice(1));
      });
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const { hashmap } = usePriceChanges();

  return (
    <View>
      <ScrollView style={{ height: "100%" }}>
        {data.map((d, i) => {
          const latest =
            hashmap[`${d.currencySymbol.toLowerCase()}/${pairMainCurrency}`] ||
            {};
          const day = parseFloat(latest.day) || 0;
          const dayMinus = day < 0;
          const week = parseFloat(latest.week) || 0;
          const weekMinus = week < 0;
          const month = parseFloat(latest.month) || 0;
          const monthMinus = month < 0;
          const year = parseFloat(latest.year) || 0;
          const yearMinus = year < 0;
          return (
            <View key={i} style={rowStyle}>
              <View style={contentStyle}>
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
