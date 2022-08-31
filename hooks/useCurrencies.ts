import { useCallback, useEffect, useState } from "react";

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const fetchCurrencies = useCallback(() => {
    fetch("https://api.pintu.co.id/v2/wallet/supportedCurrencies")
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
