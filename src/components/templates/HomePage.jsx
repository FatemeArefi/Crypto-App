import { useState } from "react";
import { useEffect } from "react";
import TableCoin from "../modules/TableCoin";

function HomePage() {
  const [coins, setCoins] = useState("");
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&x_cg_demo_api_key=CG-43YKxAQCbJTLZVsP9d1NNnLm"
    )
      .then((res) => res.json())
      .then((json) => setCoins(json));
  }, []);

  return (
    <div>
      <TableCoin coins={coins} />
    </div>
  );
}

export default HomePage;
