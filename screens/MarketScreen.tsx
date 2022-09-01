import { ScrollView, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntIcon from "@expo/vector-icons/AntDesign";

import usePriceChanges from "../hooks/usePriceChanges";
import useCurrencies from "../hooks/useCurrencies";

import BottomSheet from "@gorhom/bottom-sheet/src";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import SortOption from "../components/SortOption";

const pairMainCurrency = "idr";
const locale = Intl.NumberFormat("id");

const rowStyle = {
  backgroundColor: "white",
  height: 68,
  borderBottomColor: "lightgray",
  borderBottomWidth: 0.5,
};

const getCurrencyDay = (hashmap, currency) => {
  const latest =
    hashmap[`${currency.currencySymbol.toLowerCase()}/${pairMainCurrency}`] ||
    {};
  const day = parseFloat(latest.day) || 0;
  const dayMinus = day < 0;
  return { latest, day, dayMinus };
};

const MarketScreen = () => {
  const currencies = useCurrencies();
  const { hashmap } = usePriceChanges();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%", "60%"], []);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("default");

  const handleSort = useCallback(() => {
    setSortOpen((open) => !open);
  }, [setSortOpen]);

  const sortName = useMemo(() => {
    if (sort === "default") return "Default";
    if (sort === "az") return "A-Z";
    if (sort === "za") return "Z-A";
    if (sort === "gainers") return "Gainers";
    if (sort === "losers") return "Losers";
  }, [sort]);

  const filteredCurrencies = useMemo(() => {
    if (sort === "default") return currencies;
    const newCurrencies = [...currencies];
    return newCurrencies.sort((a, b) => {
      const cA = getCurrencyDay(hashmap, a);
      const cB = getCurrencyDay(hashmap, b);

      if (sort === "az") {
        return a.name.localeCompare(b.name);
      } else if (sort === "za") {
        return b.name.localeCompare(a.name);
      } else if (sort === "gainers") {
        return cB.day - cA.day;
      } else if (sort === "losers") {
        return cA.day - cB.day;
      }
      return 0;
    });
  }, [currencies, sort, hashmap]);

  return (
    <View
      style={{
        marginBottom: 73,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Market
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <AntIcon
              name="staro"
              size={25}
              color="black"
              style={{ marginRight: 10 }}
            />
            <AntIcon name="search1" size={25} color="black" />
          </View>
        </View>
        <View
          style={{
            marginTop: 8,
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
            onTouchEnd={handleSort}
          >
            <Text
              style={{
                fontWeight: sortOpen ? "bold" : "normal",
                color: sortOpen ? "blue" : "black",
              }}
            >
              {sortName}
            </Text>
            <Ionicons name={`caret-down-outline`} size={18} color="black" />
          </View>
        </View>
      </View>
      <ScrollView style={{ height: "100%" }}>
        {filteredCurrencies.map((d, i) => {
          const { latest, day, dayMinus } = getCurrencyDay(hashmap, d);
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

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={{
          display: sortOpen ? "flex" : "none",
        }}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <Text>Sort by</Text>
          <SortOption
            active={sort === "default"}
            onClick={() => setSort("default")}
            text="Default"
          />
          <SortOption
            active={sort === "gainers"}
            onClick={() => setSort("gainers")}
            text="Gainers (24 hours)"
          />
          <SortOption
            active={sort === "losers"}
            onClick={() => setSort("losers")}
            text="Losers (24 hours)"
          />
          <SortOption
            active={sort === "az"}
            onClick={() => setSort("az")}
            text="Asset Name A-Z"
          />
          <SortOption
            active={sort === "za"}
            onClick={() => setSort("za")}
            text="Asset Name Z-A"
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default MarketScreen;
