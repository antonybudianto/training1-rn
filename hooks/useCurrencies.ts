import { useCallback, useEffect, useState } from "react";
import { API_DOMAIN } from "../constants/api";

const CURRENCIES_API = `https://${API_DOMAIN}/v2/wallet/supportedCurrencies`;

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const fetchCurrencies = useCallback(() => {
    fetch(CURRENCIES_API)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        setCurrencies(json.payload.slice(1));
      });
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return currencies;
};

export default useCurrencies;
