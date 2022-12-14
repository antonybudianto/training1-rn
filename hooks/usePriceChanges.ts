import { useCallback, useEffect, useState } from "react";
import { API_DOMAIN } from "../constants/api";

const PRICE_CHANGE_API = `https://${API_DOMAIN}/v2/trade/price-changes`;

const usePriceChanges = () => {
  const [hashmap, setHashmap] = useState({});

  const fetchChanges = useCallback(() => {
    fetch(PRICE_CHANGE_API)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        const hashmap = json.payload.reduce((acc, curr) => {
          const newObj = { ...acc };
          newObj[curr.pair] = curr;
          return newObj;
        }, {});
        setHashmap(hashmap);
      });
  }, []);

  useEffect(() => {
    const itvId = setInterval(() => {
      fetchChanges();
    }, 2000);

    return () => {
      clearInterval(itvId);
    };
  }, []);

  return { hashmap };
};

export default usePriceChanges;
